import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "RentDuniya",
    category: "Rental Property Platform",
    tools:
      "react.js, node.js, express.js, mongoDB, aws s3 ,docker, ci/cd, razorpay",
    image: "/images/rentduniya.png",
  },
  {
    title: "Procodes",
    category: "Property directory",
    tools: "react.js, node.js, express.js, mongoDB, aws s3 ,docker, ci/cd",
    image: "/images/prop.png",
  },
  {
    title: "Blogging Platform",
    category: "Medium like Blogging Platform",
    tools: "react.js, node.js, express.js, mongoDB",
    image: "/images/blog.png",
  },
  {
    title: "Nike AIR",
    category: "E-commerce Platform for nike products",
    tools: "React.js, Node.js",
    image: "/images/air.png",
  },
  {
    title: "Crypto Market Tracker",
    category: "Crypto Market Tracker with real-time data",
    tools: "React.js, Node.js, crypto APIs",
    image: "/images/coin.png",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating],
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>

          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>

                      <div className="carousel-details">
                        <h4>{project.title}</h4>

                        <p className="carousel-category">{project.category}</p>

                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>

                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>

          {/* GitHub CTA */}
          <div className="work-github">
            <p>Want to explore more projects?</p>

            <a
              href="https://github.com/SinghRohiitt"
              target="_blank"
              rel="noopener noreferrer"
              className="github-button"
              data-cursor="disable"
            >
              <FaGithub /> View More on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
