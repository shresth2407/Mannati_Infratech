import { NavLink } from "react-router-dom";
import "./website.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        {/* BRAND */}
        <div className="footer-brand">
          <h2 className="footer-logo-text">Mannati Infratech</h2>
          <p>
            Mannati Infratech is committed to delivering quality infrastructure,
            smart solutions, and innovative construction projects that shape
            the future.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/projects">Projects</a>
          <a href="/events">Events</a>
          <a href="/contact">Contact</a>
        </div>

        {/* SERVICES */}
        <div className="footer-links">
          <h4>Our Services</h4>
          <span>Infrastructure Projects</span>
          <span>Real Estate Development</span>
          <span>Construction Services</span>
          <span>Smart Solutions</span>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-contact">
          <h4>Stay Connected</h4>
          <p>Get updates about our latest projects</p>

          <div className="footer-newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 Mannati Infratech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

