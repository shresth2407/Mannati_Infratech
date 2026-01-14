import { useState } from "react";
import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";
import Chatbot from "../../components/website/Chatbot";
import { submitEnquiry } from "../../api/api";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await submitEnquiry(formData);
      setSuccess(res.message || "Enquiry submitted successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="contact-hero-content animate-slide">
          <h1>Contact Us</h1>
          <p>
            Let's discuss your project requirements and build something great
            together.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="contact-section fade-in">
        <div className="contact-container">
          {/* LEFT INFO */}
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>
              Reach out to Mannati Infratech for infrastructure and construction
              solutions. Our team will get back to you shortly.
            </p>

            <div className="info-box">
              <span>📍</span>
              <p>Patna, Bihar, India</p>
            </div>

            <div className="info-box">
              <span>📞</span>
              <p>+91 XXXXX XXXXX</p>
            </div>

            <div className="info-box">
              <span>✉️</span>
              <p>contact@mannatiinfratech.com</p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="contact-form-card">
            <h3>Send Enquiry</h3>

            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">{success}</div>}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />

      {/* 🤖 CHATBOT (CONTACT PAGE ONLY) */}
      <Chatbot />
    </>
  );
};

export default Contact;
