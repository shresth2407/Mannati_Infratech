import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/api";
import "../../components/admin/admin.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    enquiries: {
      total: 0,
      pending: 0,
      resolved: 0,
    },
    gallery: 0,
    projects: {
      total: 0,
      active: 0,
      completed: 0,
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let intervalId;

    const loadStats = async () => {
      try {
        const response = await getDashboardStats();

        // ✅ SUPPORT BOTH FORMATS (OLD + NEW)
        const data = response.stats || response;

        setStats({
          enquiries: {
            total: data?.enquiries?.total ?? 0,
            pending: data?.enquiries?.pending ?? 0,
            resolved: data?.enquiries?.resolved ?? 0,
          },
          gallery: data?.gallery ?? 0,
          projects: {
            total: data?.projects?.total ?? 0,
            active: data?.projects?.active ?? 0,
            completed: data?.projects?.completed ?? 0,
          },
        });

        setError("");
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    // 🔹 Initial load
    loadStats();

    // 🔁 REAL-TIME UPDATE (every 5 sec)
    intervalId = setInterval(loadStats, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <p className="loading-text">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="admin-page">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* 🔵 ENQUIRIES */}
      <div className="dashboard-section">
        <h3>Enquiries</h3>
        <div className="dashboard-grid">
          <StatCard title="Total Enquiries" value={stats.enquiries.total} color="enquiries" />
          <StatCard title="Pending Enquiries" value={stats.enquiries.pending} color="warning" />
          <StatCard title="Resolved Enquiries" value={stats.enquiries.resolved} color="success" />
        </div>
      </div>

      {/* 🖼️ GALLERY */}
      <div className="dashboard-section">
        <h3>Gallery</h3>
        <div className="dashboard-grid">
          <StatCard title="Gallery Items" value={stats.gallery} color="gallery" />
        </div>
      </div>

      {/* 🟢 PROJECTS */}
      <div className="dashboard-section">
        <h3>Projects</h3>
        <div className="dashboard-grid">
          <StatCard title="Total Projects" value={stats.projects.total} color="projects" />
          <StatCard title="Active Projects" value={stats.projects.active} color="info" />
          <StatCard title="Completed Projects" value={stats.projects.completed} color="success" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  return (
    <div className={`dashboard-card ${color}`}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
};

export default Dashboard;
