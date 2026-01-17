import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginAdmin } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginAdmin({ username, password });
      login(data.token);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card animate-fade">
        <h1 className="company-name">Mannati Infratech</h1>
        <p className="company-tagline">Admin Control Panel</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="login-links">
          <Link to="/admin/forgot-password">Forgot password?</Link>
        </div>

        {/* ✅ NEW : BACK TO WEBSITE */}
        <div className="back-to-site">
          <Link to="/">← Back to Website</Link>
        </div>

        <p className="login-footer">
          © {new Date().getFullYear()} Mannati Infratech
        </p>
      </div>
    </div>
  );
};

export default Login;
