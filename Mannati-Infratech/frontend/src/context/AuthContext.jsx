import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     INIT AUTH (ON APP LOAD)
  ========================= */
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    const expiry = localStorage.getItem("adminTokenExpiry");

    if (storedToken && expiry) {
      if (Date.now() < Number(expiry)) {
        setToken(storedToken);
        autoLogout(Number(expiry) - Date.now());
      } else {
        logout();
      }
    }

    setLoading(false);
  }, []);

  /* =========================
     LOGIN
  ========================= */
  const login = (jwtToken) => {
    const SESSION_TIME = 30 * 60 * 1000; // 30 minutes
    const expiryTime = Date.now() + SESSION_TIME;

    localStorage.setItem("adminToken", jwtToken);
    localStorage.setItem("adminTokenExpiry", expiryTime);

    setToken(jwtToken);
    autoLogout(SESSION_TIME);
  };

  /* =========================
     AUTO LOGOUT TIMER
  ========================= */
  const autoLogout = (time) => {
    setTimeout(() => {
      logout();
      alert("Session expired. Please login again.");
    }, time);
  };

  /* =========================
     LOGOUT
  ========================= */
  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminTokenExpiry");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
