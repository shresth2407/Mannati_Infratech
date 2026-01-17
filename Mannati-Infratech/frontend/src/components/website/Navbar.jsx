import { NavLink } from "react-router-dom";
import "./website.css";

const Navbar = () => {
  return (
    <header className="website-navbar">
      {/* BRAND */}
      <div className="brand-logo">
        <div className="infra-logo">
          <span className="pillar left"></span>
          <span className="pillar center"></span>
          <span className="pillar right"></span>
          <span className="foundation"></span>
        </div>

        <div className="brand-text">
          Mannati
          <span> Infratech</span>
        </div>
      </div>

      {/* NAV */}
      <nav className="website-nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
