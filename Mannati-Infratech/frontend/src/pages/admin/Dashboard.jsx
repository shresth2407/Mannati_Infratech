import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDashboardStats } from "../../api/api";
import "../../components/admin/admin.css";

const Dashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats(token);
        setStats(data);
      } catch (err) {
        console.log("DASHBOARD TOKEN:", token);
        console.error(err.message);
      }
    };
    loadStats();
  }, [token]);

  if (!stats) return <p className="loading-text">Loading dashboard...</p>;

  return (
    <div className="admin-page">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* 🔵 ENQUIRIES */}
      <div className="dashboard-section">
        <h3>Enquiries</h3>
        <div className="dashboard-grid">
          <StatCard
            title="Total Enquiries"
            value={stats.enquiries.total}
            color="enquiries"
          />
          <StatCard
            title="Pending Enquiries"
            value={stats.enquiries.pending}
            color="warning"
          />
          <StatCard
            title="Resolved Enquiries"
            value={stats.enquiries.resolved}
            color="success"
          />
        </div>
      </div>

      {/* 🖼️ GALLERY */}
      <div className="dashboard-section">
        <h3>Gallery</h3>
        <div className="dashboard-grid">
          <StatCard
            title="Gallery Images"
            value={stats.gallery}
            color="gallery"
          />
        </div>
      </div>

      {/* 🟢 PROJECTS */}
      <div className="dashboard-section">
        <h3>Projects</h3>
        <div className="dashboard-grid">
          <StatCard
            title="Total Projects"
            value={stats.projects.total}
            color="projects"
          />
          <StatCard
            title="Active Projects"
            value={stats.projects.active}
            color="info"
          />
          <StatCard
            title="Completed Projects"
            value={stats.projects.completed}
            color="success"
          />
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
