import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { useEffect } from "react";
import { initialFX } from "./utils/initialFX";
const Landing = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    document.body.style.overflowY = "auto";
    initialFX();
  }, []);
  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I'm</h2>
          <h1>
            ROHIT
            <br />
            <span>SINGH</span>
          </h1>
        </div>

        <div className="landing-info">
          <h3>A Full Stack</h3>

          <h2 className="landing-info-h2">
            <span>Developer</span>
          </h2>

          <h2>
            <span>Engineer</span>
          </h2>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Landing;
