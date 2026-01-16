import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";
import "./home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Navbar />

      {/* SIDE ADMIN LOGIN */}
      <a href="/admin/login" className="admin-side-btn">
        <span className="dot"></span> Admin Portal
      </a>

      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-bg">
  {/* BACKGROUND IMAGE */}
  <div className="hero-image-bg"></div>

  {/* BLOBS */}
  <span className="blob pink"></span>
  <span className="blob blue"></span>
  <span className="blob orange"></span>

  {/* FLOATING PARTICLES */}
  <span className="infra-particle particle-1"></span>
  <span className="infra-particle particle-2"></span>
  <span className="infra-particle particle-3"></span>

  {/* FLOATING SLABS */}
  <span className="infra-slab slab-1"></span>
  <span className="infra-slab slab-2"></span>
  <span className="infra-slab slab-3"></span>
</div>


        {/* HERO CONTENT */}
        <div className="hero-content">
          <div className="badge">Innovating Since 2014</div>

          <h1>
            Building <br />
            <span className="gradient-text">Next-Gen Infrastructure</span>
          </h1>

          <p>
            Mannati Infratech delivers future-ready infrastructure with
            engineering excellence, innovation, and unwavering trust.
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

        <div className="scroll-indicator"></div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <p>Projects Delivered</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">10+</div>
              <p>Years Experience</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="about-preview">
        <div className="container">
          <span className="sub-title">Our Identity</span>
          <h2>Who We Are</h2>
          <div className="divider"></div>
          <p>
            A modern infrastructure company working across residential,
            commercial, and industrial projects with a focus on quality,
            safety, and long-term value.
          </p>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="services">
        <div className="container">
          <h2 className="section-title">Our Expertise</h2>
          <div className="services-grid">
            <div className="service-card pink">
              <div className="card-overlay"></div>
              <div className="icon">🏗️</div>
              <h3>Construction</h3>
              <p>Premium construction with strong engineering foundations.</p>
            </div>

            <div className="service-card blue">
              <div className="card-overlay"></div>
              <div className="icon">🏢</div>
              <h3>Infrastructure</h3>
              <p>Large-scale infrastructure built for durability and growth.</p>
            </div>

            <div className="service-card orange">
              <div className="card-overlay"></div>
              <div className="icon">📊</div>
              <h3>Project Management</h3>
              <p>Smart planning, monitoring and on-time project delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <div className="cta-content">
          <h2>Let’s Build Something Remarkable</h2>
          <p>Partner with Mannati Infratech for your next big project.</p>
          <a href="/contact" className="btn primary big">
            Get Started Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
