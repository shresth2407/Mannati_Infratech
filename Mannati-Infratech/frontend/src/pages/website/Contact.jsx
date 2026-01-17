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

      {/* HERO */}
      <section className="contact-hero"></section>

      {/* CONTACT SECTION */}
      <section className="contact-section">
        <div className="contact-container">
          
          {/* INFO CARD */}
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

          {/* FORM CARD */}
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

          {/* MAP CARD (FULL WIDTH BELOW) */}
          <div className="contact-map-card">
            <h3>Our Location</h3>
            <iframe
              title="Mannati Infratech Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115132.86107233!2d85.07300220677843!3d25.60817557053523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5842f0334747%3A0x808535086b97b003!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000"
              loading="lazy"
            ></iframe>
          </div>
          
        </div>
      </section>

      <Footer />
      <Chatbot />
    </>
  );
};

export default Contact;