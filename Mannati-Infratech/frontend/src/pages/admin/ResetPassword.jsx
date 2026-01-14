import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/api";
import "./login.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await resetPassword(token, {
        newPassword,
      });
      setMessage(res.message);

      // Redirect to login after success
      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card animate-fade">
        <h2>Set New Password</h2>

        {error && <div className="error-msg">{error}</div>}
        {message && <div className="success-msg">{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
