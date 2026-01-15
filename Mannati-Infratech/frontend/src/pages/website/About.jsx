import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";
import "./about.css";

const About = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Building Infrastructure That Lasts</h1>
          <p>
            Mannati Infratech is a trusted infrastructure and construction
            company delivering quality-driven residential, commercial,
            and industrial projects across India.
          </p>
        </div>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          Mannati Infratech is a growing infrastructure development company
          committed to delivering reliable, durable, and future-ready
          construction solutions. With a strong focus on engineering
          excellence, safety, and timely execution, we partner with clients
          to build spaces that create long-term value.
          <br /><br />
          Our expertise spans residential complexes, commercial buildings,
          industrial facilities, and infrastructure projects. Every project
          we undertake reflects our dedication to quality workmanship,
          transparent processes, and client satisfaction.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="mission-vision">
        <div className="mv-card">
          <h3>Our Mission</h3>
          <p>
            To deliver high-quality infrastructure solutions through
            innovation, integrity, and engineering excellence while
            maintaining the highest standards of safety and sustainability.
          </p>
        </div>

        <div className="mv-card">
          <h3>Our Vision</h3>
          <p>
            To become a reliable and respected name in the infrastructure
            industry by consistently delivering projects that exceed
            expectations and contribute to national development.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="about-section">
        <h2>Why Choose Mannati Infratech</h2>
        <p>
          We believe strong infrastructure begins with strong values.
          Our approach combines technical expertise with disciplined
          project management to ensure every project is delivered with
          precision and accountability.
        </p>

        <div className="why-grid">
          <div className="why-card">Quality-Centric Execution</div>
          <div className="why-card">Experienced Project Team</div>
          <div className="why-card">On-Time Project Delivery</div>
          <div className="why-card">Transparent Work Process</div>
          <div className="why-card">Safety & Compliance First</div>
          <div className="why-card">Long-Term Client Relationships</div>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div className="stat-card">
          <h2>10+</h2>
          <p>Years of Industry Experience</p>
        </div>

        <div className="stat-card">
          <h2>50+</h2>
          <p>Successfully Delivered Projects</p>
        </div>

        <div className="stat-card">
          <h2>100%</h2>
          <p>Client Satisfaction Record</p>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Your Trusted Infrastructure Partner</h2>
        <p>
          At Mannati Infratech, we don’t just construct buildings —
          we create long-lasting infrastructure that supports growth,
          development, and future generations.
        </p>
      </section>

      <Footer />
    </>
  );
};

export default About;
