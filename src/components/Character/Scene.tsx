import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const { setLoading } = useLoading();
  const [character, setChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!canvasDiv.current) return;

    if (window.innerWidth < 768) {
      console.warn("Mobile device detected - skipping 3D scene");
      return;
    }

    if (!isWebGLAvailable()) {
      console.warn("WebGL not supported on this device.");
      return;
    }

    const scene = sceneRef.current;

    const rect = canvasDiv.current.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;

    /* ---------------- Renderer ---------------- */

    const isLowEndDevice =
      navigator.hardwareConcurrency <= 4 ||
      /Android|iPhone|iPad/i.test(navigator.userAgent);

    let renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isLowEndDevice,
      powerPreference: "high-performance",
    });

    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(isLowEndDevice ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    rendererRef.current = renderer;

    canvasDiv.current.appendChild(renderer.domElement);

    /* Prevent WebGL crashes */

    renderer.domElement.addEventListener(
      "webglcontextlost",
      (event) => {
        event.preventDefault();
        console.warn("WebGL Context Lost");
      },
      false
    );

    renderer.domElement.addEventListener(
      "webglcontextrestored",
      () => {
        console.warn("WebGL Context Restored");
      },
      false
    );

    /* ---------------- Camera ---------------- */

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    /* ---------------- Scene Variables ---------------- */

    let headBone: THREE.Object3D | null = null;
    let screenLight: any | null = null;
    let mixer: THREE.AnimationMixer | null = null;

    const clock = new THREE.Clock();

    /* ---------------- Lighting ---------------- */

    const light = setLighting(scene);

    /* ---------------- Loading ---------------- */

    const progress = setProgress((value) => setLoading(value));

    const { loadCharacter } = setCharacter(renderer, scene, camera);

    /* ---------------- Load Character ---------------- */

    loadCharacter().then((gltf) => {
      if (!gltf) return;

      const animations = setAnimations(gltf);

      hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);

      mixer = animations.mixer;

      const char = gltf.scene;
      setChar(char);
      scene.add(char);

      headBone = char.getObjectByName("spine006") || null;
      screenLight = char.getObjectByName("screenlight") || null;

      progress.loaded().then(() => {
        setTimeout(() => {
          light.turnOnLights();
          animations.startIntro();
        }, 2500);
      });
    });

    /* ---------------- Resize ---------------- */

    const resizeHandler = () =>
      handleResize(renderer, camera, canvasDiv, character!);

    window.addEventListener("resize", resizeHandler);

    /* ---------------- Mouse ---------------- */

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    document.addEventListener("mousemove", onMouseMove);

    /* ---------------- Touch ---------------- */

    let debounce: number | undefined;

    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;

      debounce = window.setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, ix, iy) => {
        mouse = { x, y };
        interpolation = { x: ix, y: iy };
      });
    };

    const landingDiv = document.getElementById("landingDiv");

    landingDiv?.addEventListener("touchstart", onTouchStart);
    landingDiv?.addEventListener("touchend", onTouchEnd);

    /* ---------------- Animation Loop ---------------- */

    const animate = () => {
      const delta = clock.getDelta();

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );

        light.setPointLight(screenLight);
      }

      if (mixer) mixer.update(delta);

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    /* Pause rendering when tab hidden */

    const handleVisibility = () => {
      if (document.hidden) renderer.setAnimationLoop(null);
      else renderer.setAnimationLoop(animate);
    };

    document.addEventListener("visibilitychange", handleVisibility);

    /* ---------------- Cleanup ---------------- */

    return () => {
      clearTimeout(debounce);

      renderer.setAnimationLoop(null);

      scene.clear();

      renderer.dispose();
      renderer.forceContextLoss();

      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("visibilitychange", handleVisibility);

      landingDiv?.removeEventListener("touchstart", onTouchStart);
      landingDiv?.removeEventListener("touchend", onTouchEnd);

      if (canvasDiv.current && renderer.domElement) {
        canvasDiv.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;