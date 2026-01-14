import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";
import "./about.css";

const About = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-content animate-slide">
          <h1>About Mannati Infratech</h1>
          <p>
            Building strong foundations with trust, quality, and modern
            infrastructure solutions.
          </p>
        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="about-section fade-in">
        <h2>Our Story</h2>
        <p>
          Mannati Infratech was founded with a vision to deliver reliable and
          high-quality construction and infrastructure solutions. Over the
          years, we have successfully executed multiple residential,
          commercial, and industrial projects while maintaining the highest
          standards of safety and excellence.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="mission-vision">
        <div className="mv-card hover-up">
          <h3>Our Mission</h3>
          <p>
            To provide innovative, cost-effective, and sustainable
            infrastructure solutions that exceed client expectations.
          </p>
        </div>

        <div className="mv-card hover-up">
          <h3>Our Vision</h3>
          <p>
            To become a trusted leader in the infrastructure and construction
            industry through quality, integrity, and innovation.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div className="stat-card">
          <h2>10+</h2>
          <p>Years Experience</p>
        </div>

        <div className="stat-card">
          <h2>50+</h2>
          <p>Projects Completed</p>
        </div>

        <div className="stat-card">
          <h2>100%</h2>
          <p>Client Satisfaction</p>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Trusted Infrastructure Partner</h2>
        <p>
          We believe in long-term partnerships built on trust, transparency,
          and performance.
        </p>
      </section>

      <Footer />
    </>
  );
};

export default About;
