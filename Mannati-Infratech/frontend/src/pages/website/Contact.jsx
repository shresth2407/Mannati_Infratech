import { useState } from "react";
import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";
import "../../components/website/website.css";
import { submitEnquiry } from "../../api/api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });
    setLoading(true);

    try {
      await submitEnquiry(form);
      setStatus({ type: "success", msg: "Enquiry submitted successfully!" });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          Get in touch with Mannati Infratech for enquiries, collaborations, or
          project discussions.
        </p>
      </section>

      <section className="contact-section">
        <div className="contact-info">
          <h3>Our Office</h3>
          <p><strong>Address:</strong> Patna, Bihar, India</p>
          <p><strong>Phone:</strong> +91 9XXXXXXXXX</p>
          <p><strong>Email:</strong> info@mannatiinfratech.com</p>
        </div>

        <form className="enquiry-form" onSubmit={handleSubmit}>
          <h3>Send an Enquiry</h3>

          {status.msg && (
            <p style={{ color: status.type === "success" ? "green" : "red" }}>
              {status.msg}
            </p>
          )}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
