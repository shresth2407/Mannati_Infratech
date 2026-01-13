import { NavLink } from "react-router-dom";
import "./website.css";

const Navbar = () => {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#1e40af" : "#374151",
    fontWeight: isActive ? "600" : "500",
  });

  return (
    <header className="website-navbar">
      <div className="website-logo">Mannati Infratech</div>

      <nav className="website-nav-links">
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/projects" style={linkStyle}>Projects</NavLink>
        <NavLink to="/events" style={linkStyle}>Events</NavLink>
        <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
