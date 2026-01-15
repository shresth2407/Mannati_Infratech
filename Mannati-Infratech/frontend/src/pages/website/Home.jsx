import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";
import "./home.css";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* SIDE ADMIN LOGIN */}
      <a href="/admin/login" className="admin-side-btn">
        Admin Login
      </a>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <span className="blob pink"></span>
          <span className="blob blue"></span>
          <span className="blob orange"></span>
        </div>

        <div className="hero-content">
          <h1>
            Building <br />
            <span>Next-Gen Infrastructure</span>
          </h1>

          <p>
            Mannati Infratech delivers future-ready infrastructure with
            engineering excellence, innovation and trust.
          </p>

          <div className="hero-buttons">
            <a href="/projects" className="btn primary">
              View Projects
            </a>
            <a href="/contact" className="btn secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat-card">
          <h3>50+</h3>
          <p>Projects Delivered</p>
        </div>
        <div className="stat-card">
          <h3>10+</h3>
          <p>Years Experience</p>
        </div>
        <div className="stat-card">
          <h3>100%</h3>
          <p>Client Satisfaction</p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-preview">
        <h2>Who We Are</h2>
        <p>
          A modern infrastructure company working across residential,
          commercial and industrial projects with a focus on quality and
          long-term value.
        </p>
      </section>

      {/* SERVICES */}
      <section className="services">
        <h2 className="section-title">Our Expertise</h2>

        <div className="services-grid">
          <div className="service-card pink">
            <div className="icon">🏗️</div>
            <h3>Construction</h3>
            <p>Premium construction with strong engineering foundations.</p>
          </div>

          <div className="service-card blue">
            <div className="icon">🏢</div>
            <h3>Infrastructure</h3>
            <p>Large-scale infrastructure built for durability and growth.</p>
          </div>

          <div className="service-card orange">
            <div className="icon">📊</div>
            <h3>Project Management</h3>
            <p>Smart planning, monitoring and on-time project delivery.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Let’s Build Something Remarkable</h2>
        <p>Partner with Mannati Infratech for your next big project.</p>
        <a href="/contact" className="btn primary big">
          Get Started
        </a>
      </section>

      <Footer />
    </>
  );
};

export default Home;
