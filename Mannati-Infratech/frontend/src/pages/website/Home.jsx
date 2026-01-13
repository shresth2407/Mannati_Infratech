import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";
import "../../components/website/website.css";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h1>Building Strong Infrastructure for Tomorrow</h1>
          <p>
            Mannati Infratech is committed to delivering high-quality
            infrastructure projects with trust, innovation, and excellence.
          </p>
          <a href="/contact" className="hero-btn">
            Get in Touch
          </a>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="highlights">
        <h2>Why Choose Mannati Infratech?</h2>

        <div className="highlight-grid">
          <div className="highlight-card">
            <h3>Quality Construction</h3>
            <p>
              We follow industry best practices to deliver durable and
              sustainable infrastructure solutions.
            </p>
          </div>

          <div className="highlight-card">
            <h3>Experienced Team</h3>
            <p>
              Our skilled professionals ensure timely and efficient project
              execution.
            </p>
          </div>

          <div className="highlight-card">
            <h3>On-Time Delivery</h3>
            <p>
              We respect deadlines and consistently deliver projects on time.
            </p>
          </div>

          <div className="highlight-card">
            <h3>Client Satisfaction</h3>
            <p>
              Building long-term relationships through transparency and trust.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Have a Project in Mind?</h2>
        <p>Let’s build something great together.</p>
        <a href="/contact">Contact Us</a>
      </section>

      <Footer />
    </>
  );
};

export default Home;
