import { useEffect, useState } from "react";
import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";
import "./projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  // 🔹 TEMP STATIC DATA (jab tak backend connect na ho)
  useEffect(() => {
    setProjects([
      {
        id: 1,
        title: "Residential Building Project",
        description:
          "High-quality residential construction with modern architecture and safety standards.",
        status: "Completed",
      },
      {
        id: 2,
        title: "Commercial Complex",
        description:
          "Premium commercial infrastructure focusing on durability and smart design.",
        status: "Ongoing",
      },
      {
        id: 3,
        title: "Road & Infrastructure Work",
        description:
          "Large-scale infrastructure project ensuring strength and long-term performance.",
        status: "Completed",
      },
    ]);
  }, []);

  return (
    <>
      {/* 🔝 NAVBAR */}
      <Navbar />

      {/* 🎨 HERO */}
      <section className="projects-hero">
        <h1>Our Projects</h1>
        <p>
          Delivering excellence in construction & infrastructure with trust
          and quality.
        </p>
      </section>

      {/* 🏗 PROJECT LIST */}
      <section className="projects-section">
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-badge">
                {project.status}
              </div>

              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <button className="project-btn">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 🔚 FOOTER */}
      <Footer />
    </>
  );
};

export default Projects;
