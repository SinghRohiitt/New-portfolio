import SplitType from "split-type";
import gsap from "gsap";
// import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  // smoother.paused(false);

  document.querySelector("main")?.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  const landingText = new SplitType(
    ".landing-info h3, .landing-intro h2, .landing-intro h1",
    { types: "chars,lines" },
  );

  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    },
  );

  const landingText2 = new SplitType(".landing-h2-info", {
    types: "chars,lines",
  });

  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    },
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    },
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    },
  );

  // Keep text but remove looping animation
  new SplitType(".landing-h2-info-1", { types: "chars" });
  new SplitType(".landing-h2-1", { types: "chars" });
  new SplitType(".landing-h2-2", { types: "chars" });
}

