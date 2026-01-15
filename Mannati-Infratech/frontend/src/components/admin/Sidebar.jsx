import { NavLink } from "react-router-dom";
import "./admin.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        Mannati<span>Admin</span>
      </div>

      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/gallery">Gallery</NavLink>
        <NavLink to="/admin/enquiries">Enquiries</NavLink>
        <NavLink to="/admin/projects">Projects</NavLink>

      </nav>
    </aside>
  );
};

export default Sidebar;
