import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";
import "./home.css";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content animate-slide">
          <h1>
            Building <span>Modern Infrastructure</span>
          </h1>

          <p>
            Mannati Infratech delivers reliable construction, infrastructure
            development, and project execution with quality and trust.
          </p>

          {/* 🔥 HERO BUTTONS (FULLY WORKING) */}
          <div className="hero-buttons">
            <a href="/projects" className="btn primary glow">
              View Projects
            </a>

            <a href="/contact" className="btn secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="about-preview fade-in">
        <h2>Who We Are</h2>
        <p>
          Mannati Infratech is a growing infrastructure company focused on
          construction excellence, timely delivery, and client satisfaction. We
          work across residential, commercial, and industrial projects.
        </p>
      </section>

      {/* SERVICES */}
      <section className="services">
        <h2 className="section-title">Our Expertise</h2>

        <div className="services-grid">
          <div className="service-card">
            <h3>Construction</h3>
            <p>
              End-to-end construction services with premium materials and skilled
              execution.
            </p>
          </div>

          <div className="service-card">
            <h3>Infrastructure</h3>
            <p>
              Roads, buildings, and infrastructure projects delivered using
              modern standards.
            </p>
          </div>

          <div className="service-card">
            <h3>Project Management</h3>
            <p>
              Professional planning, monitoring, and on-time project delivery.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Let's Build the Future Together</h2>
        <p>Contact us today to discuss your next project.</p>

        <a href="/contact" className="btn primary">
          Get In Touch
        </a>
      </section>

      <Footer />
    </>
  );
};

export default Home;
