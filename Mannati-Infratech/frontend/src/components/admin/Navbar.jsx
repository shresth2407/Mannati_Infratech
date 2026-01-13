import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div className="admin-navbar">
      <div className="admin-navbar-left">
        <h3 className="company-name">Mannati Infratech</h3>
        <span className="panel-tag">Admin Panel</span>
      </div>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
