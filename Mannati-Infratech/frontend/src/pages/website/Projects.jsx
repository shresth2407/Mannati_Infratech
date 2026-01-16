import { useEffect, useState } from "react";
import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";
import { getPublicProjects } from "../../api/api";
import "./projects.css";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/1200x700?text=Project+Image";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [activeProject, setActiveProject] = useState(null);

  /* ================= LOAD PROJECTS ================= */
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getPublicProjects();
        setProjects(data || []);
      } catch (err) {
        console.error("Project load failed", err);
      }
    };

    loadProjects();
  }, []);

  /* ================= FILTER ================= */
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.status === filter);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="projects-hero">
        <h1>Our Projects</h1>
        <p>Explore our ongoing and completed infrastructure projects</p>
      </section>

      {/* FILTER */}
      <section className="projects-filter">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "ongoing" ? "active" : ""}
          onClick={() => setFilter("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </section>

      {/* PROJECT GRID */}
      <section className="projects-section">
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className={`project-card ${project.status}`}
            >
              {/* IMAGE */}
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE;
                }}
              />

              {/* STATUS */}
              <span className={`project-badge ${project.status}`}>
                {project.status === "completed"
                  ? "Completed"
                  : "Ongoing"}
              </span>

              {/* CONTENT (NO DESCRIPTION HERE ❌) */}
              <div className="project-content">
                <h3>{project.title}</h3>

                <button
                  className="view-btn"
                  onClick={() => setActiveProject(project)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL – DESCRIPTION ONLY HERE ✅ */}
      {activeProject && (
        <div className="project-modal">
          <div className="modal-box">
            <span
              className="close-modal"
              onClick={() => setActiveProject(null)}
            >
              ✕
            </span>

            <img
              src={activeProject.image}
              alt={activeProject.title}
              onError={(e) => {
                e.target.src = FALLBACK_IMAGE;
              }}
            />

            <h2>{activeProject.title}</h2>

            {/* ✅ DESCRIPTION ONLY IN DETAIL VIEW */}
            <p>{activeProject.description}</p>

            <span
              className={`modal-status ${activeProject.status}`}
            >
              {activeProject.status}
            </span>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Projects;
