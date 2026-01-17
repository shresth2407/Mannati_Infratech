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

  {/* VIDEO BACKGROUND */}
  <div className="hero-video-bg">
    <video
      src="/videos/video_1.mp4"
      autoPlay
      muted
      loop
      playsInline
    />
  </div>

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
          

          <h1>
            Building <br />
            <span className="gradient-text">Next-Gen Infrastructure</span>
          </h1>

          

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

      {/* ================= SERVICES ================= */}
      <section className="services">
  <div className="container">
    <h2 className="section-title">Our Expertise</h2>

    <div className="services-grid">
      <div className="service-card pink">
        <div className="service-image"></div>
        <h3>Construction</h3>
        <p>Premium construction with strong engineering foundations.</p>
      </div>

      <div className="service-card blue">
        <div className="service-image"></div>
        <h3>Infrastructure</h3>
        <p>Large-scale infrastructure built for durability and growth.</p>
      </div>

      <div className="service-card orange">
        <div className="service-image"></div>
        <h3>Project Management</h3>
        <p>Smart planning, monitoring and on-time project delivery.</p>
      </div>
    </div>
  </div>
</section>

      {/* ================= WHY CHOOSE US ================= */}
<section className="why-choose">
  <div className="container">
    <h2 className="section-title">Why Choose Mannati Infratech</h2>

    <div className="choose-grid">
      <div className="choose-card">
        <h3>Engineering Expertise</h3>
        <p>
          Our projects are driven by strong civil engineering principles,
          structural accuracy, and compliance with industry standards.
        </p>
      </div>

      <div className="choose-card">
        <h3>Quality Materials</h3>
        <p>
          We use certified materials and modern construction techniques
          to ensure long-lasting and sustainable infrastructure.
        </p>
      </div>

      <div className="choose-card">
        <h3>On-Time Delivery</h3>
        <p>
          Clear planning, disciplined execution, and experienced teams
          help us deliver projects within committed timelines.
        </p>
      </div>

      <div className="choose-card">
        <h3>Safety & Compliance</h3>
        <p>
          Safety is non-negotiable. We follow strict safety protocols
          across all construction and infrastructure activities.
        </p>
      </div>
      <div className="choose-card">
        <h3>Safety & Compliance</h3>
        <p>
          Safety is non-negotiable. We follow strict safety protocols
          across all construction and infrastructure activities.
        </p>
      </div>
      <div className="choose-card">
        <h3>On-Time Delivery</h3>
        <p>
          Clear planning, disciplined execution, and experienced teams
          help us deliver projects within committed timelines.
        </p>
      </div>
    </div>
  </div>
</section>


{/* ================= OUR PROCESS ================= */}
<section className="process-section">
  <div className="container">
    <h2 className="section-title">Our Working Process</h2>

    <div className="process-grid">
      <div className="process-step">
        <span>01</span>
        <h4>Planning & Survey</h4>
        <p>
          Site surveys, feasibility analysis, and detailed project planning
          aligned with client requirements.
        </p>
      </div>

      <div className="process-step">
        <span>02</span>
        <h4>Design & Engineering</h4>
        <p>
          Structural design, material planning, and execution strategy
          using modern engineering tools.
        </p>
      </div>

      <div className="process-step">
        <span>03</span>
        <h4>Execution</h4>
        <p>
          Skilled workforce, quality supervision, and controlled
          construction practices on-site.
        </p>
      </div>
    </div>
  </div>
</section>


{/* ================= SECTORS ================= */}
<section className="sectors">
  <div className="container">
    <h2 className="section-title">Sectors We Serve</h2>

    <div className="sectors-grid">
      <div className="sector-card">
        <h3>Residential Projects</h3>
        <p>
          Independent houses, apartments, and housing developments built
          with safety and comfort in mind.
        </p>
      </div>

      <div className="sector-card">
        <h3>Commercial Infrastructure</h3>
        <p>
          Offices, commercial complexes, and mixed-use developments with
          modern construction standards.
        </p>
      </div>

      <div className="sector-card">
        <h3>Industrial Projects</h3>
        <p>
          Industrial buildings, warehouses, and utility structures designed
          for heavy-duty operations.
        </p>
      </div>

      <div className="sector-card">
        <h3>Public Infrastructure</h3>
        <p>
          Roads, utilities, and public-use infrastructure projects executed
          with durability and compliance.
        </p>
      </div>
       <div className="sector-card">
        <h3>Industrial Projects</h3>
        <p>
          Industrial buildings, warehouses, and utility structures designed
          for heavy-duty operations.
        </p>
      </div>
      <div className="sector-card">
        <h3>Residential Projects</h3>
        <p>
          Independent houses, apartments, and housing developments built
          with safety and comfort in mind.
        </p>
      </div>

    </div>
  </div>
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
