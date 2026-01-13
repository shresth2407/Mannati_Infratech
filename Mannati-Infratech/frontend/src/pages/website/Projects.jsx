import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";
import "../../components/website/website.css";

const Projects = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="projects-hero">
        <h1>Our Infrastructure Projects</h1>
        <p>
          We have successfully delivered multiple infrastructure projects with
          a focus on quality, safety, and timely execution.
        </p>
      </section>

      {/* PROJECT LIST */}
      <section className="projects-section">
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-image"></div>
            <div className="project-content">
              <h3>Residential Building Project</h3>
              <p>
                Construction of modern residential apartments with advanced
                structural standards.
              </p>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image"></div>
            <div className="project-content">
              <h3>Commercial Complex</h3>
              <p>
                Development of a commercial complex with premium construction
                quality and design.
              </p>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image"></div>
            <div className="project-content">
              <h3>Road Infrastructure</h3>
              <p>
                Execution of road construction projects ensuring durability and
                safety standards.
              </p>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image"></div>
            <div className="project-content">
              <h3>Industrial Facility</h3>
              <p>
                Infrastructure development for industrial facilities with
                scalable designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Projects;
