import { useState } from "react";
import { requestPasswordReset } from "../../api/api";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await requestPasswordReset({ username });
    setMessage(res.message);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter admin username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button>Send Reset Link</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
