import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>

        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* Rent Duniya */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Rent Duniya</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Developed and maintained a real estate platform where users can
              post and explore properties. Built scalable REST APIs using
              Node.js and Express, integrated MongoDB database, and created
              responsive UI using React.js and Tailwind CSS. Implemented
              property filters, search functionality, authentication, and
              dashboard features.
            </p>
          </div>

          {/* PropCodes */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MERN Stack Developer</h4>
                <h5>PropCodes</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Worked on full-stack development of real estate solutions using
              the MERN stack. Designed backend APIs, handled property data
              management, and optimized frontend performance with React.js.
              Built features like property posting, advanced filters,
              authentication, and user dashboards.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;