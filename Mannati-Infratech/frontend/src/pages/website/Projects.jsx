import { useState } from "react";
import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";
import "./projects.css";

/* 🔥 SAFE + VERIFIED IMAGE LINKS */
const projectsData = [
  {
    id: 1,
    title: "Residential Complex",
    description: "Luxury residential project with modern amenities.",
    details:
      "This residential complex includes premium apartments, landscaped gardens, clubhouse, gym, and 24x7 security.",
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Commercial Tower",
    description: "High-rise commercial building in city center.",
    details:
      "A modern commercial tower with office spaces, elevators, parking, and advanced fire safety systems.",
    status: "ongoing",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Highway Infrastructure",
    description: "National highway development project.",
    details:
      "Construction of multi-lane national highway with bridges, drainage, and safety infrastructure.",
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Industrial Park",
    description: "Large scale industrial development.",
    details:
      "Industrial park with warehouses, manufacturing units, internal roads, and utilities.",
    status: "ongoing",
    image:
      "https://lh4.googleusercontent.com/O4zJ8rAt3ZsUKsPNV8xv99BgMKI8Q0wgo9hHt9kzCqyDCIuB_MRUeuHJq44TZAsMpBJA0yVp3t_TboBC1YVLpNi4pqgEgqqqhUpJz3PXOONTWAyPzijYNRvHMGB0ymSXfHkpTEqntiIXHQW9dw",
  },
];

const FALLBACK_IMAGE =
  "https://via.placeholder.com/1200x700?text=Project+Image";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((p) => p.status === filter);

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
          All Projects
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

      {/* PROJECTS */}
      <section className="projects-section">
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`project-card ${project.status}`}
            >
              {/* IMAGE (🔥 SAFE LOAD) */}
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

              {/* CONTENT */}
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

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

      {/* MODAL */}
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
            <p>{activeProject.details}</p>

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
