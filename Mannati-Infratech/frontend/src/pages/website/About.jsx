import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";
import "../../components/website/website.css";

const About = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="about-hero">
        <h1>About Mannati Infratech</h1>
        <p>
          Mannati Infratech is a growing infrastructure company committed to
          delivering reliable, high-quality construction and development
          solutions across India.
        </p>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          With a strong focus on quality, safety, and innovation, Mannati
          Infratech has successfully executed multiple infrastructure projects.
          Our approach combines technical expertise with transparent project
          management to ensure client satisfaction.
        </p>
      </section>

      {/* VISION & MISSION */}
      <section className="about-section">
        <h2>Our Vision & Mission</h2>

        <div className="vm-grid">
          <div className="vm-card">
            <h3>Our Vision</h3>
            <p>
              To become a trusted name in the infrastructure industry by
              delivering sustainable and future-ready projects.
            </p>
          </div>

          <div className="vm-card">
            <h3>Our Mission</h3>
            <p>
              To provide high-quality infrastructure solutions through
              innovation, integrity, and timely project execution.
            </p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="about-section">
        <h2>Why Choose Us</h2>
        <p>
          We believe in building long-term relationships with our clients by
          maintaining transparency, ensuring safety, and delivering excellence
          in every project we undertake.
        </p>
      </section>

      <Footer />
    </>
  );
};

export default About;
