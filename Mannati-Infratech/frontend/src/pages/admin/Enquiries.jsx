import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../components/admin/admin.css";

const Enquiries = () => {
  const { token } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/enquiries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch enquiries");
      }

      setEnquiries(data.enquiries);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      const response = await fetch(
        `http://localhost:5000/api/enquiries/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      // Refresh list after success
      fetchEnquiries();
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p className="loading-text">Loading enquiries...</p>;

  return (
    <div className="admin-page">
      <h2>Customer Enquiries</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Message</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {enquiries.map((e) => (
            <tr key={e._id}>
              <td>{e.name}</td>

              <td>
                📞 {e.phone}
                <br />
                ✉️ {e.email}
              </td>

              <td>{e.message}</td>

              <td>
                <span className={`status-badge ${e.status}`}>
                  {e.status.toUpperCase()}
                </span>
              </td>

              <td>
                {e.status !== "contacted" && (
                  <button
                    className="btn contacted"
                    disabled={updatingId === e._id}
                    onClick={() => updateStatus(e._id, "contacted")}
                  >
                    {updatingId === e._id
                      ? "Updating..."
                      : "Mark Contacted"}
                  </button>
                )}

                {e.status !== "closed" && (
                  <button
                    className="btn closed"
                    disabled={updatingId === e._id}
                    onClick={() => updateStatus(e._id, "closed")}
                  >
                    {updatingId === e._id ? "Updating..." : "Mark Closed"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Enquiries;
