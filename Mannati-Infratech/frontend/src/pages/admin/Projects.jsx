import { useEffect, useState } from "react";
import {
  getAdminProjects,
  createProject,
  updateProject,
} from "../../api/api";
import "../../components/admin/admin.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "ongoing",
    image: "",     // main image
    images: [],    // extra images (EDIT only)
  });

  /* ================= LOAD PROJECTS ================= */
  const loadProjects = async () => {
    try {
      const data = await getAdminProjects();
      setProjects(data || []);
    } catch (err) {
      console.error("Project load failed", err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  /* ================= MAIN IMAGE ================= */
  const handleMainImage = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  /* ================= EXTRA IMAGES (EDIT MODE ONLY) ================= */
  const handleExtraImages = (files) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  /* ================= SUBMIT ================= */
  const submitProject = async () => {
    if (!form.title || !form.description) {
      alert("Title & Description required");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await updateProject(editingId, form);
      } else {
        if (!form.image) {
          alert("Project image required");
          return;
        }
        await createProject(form);
      }

      setForm({
        title: "",
        description: "",
        status: "ongoing",
        image: "",
        images: [],
      });

      setEditingId(null);
      loadProjects();
    } catch (err) {
      alert(err.message || "Project save failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const editProject = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title,
      description: p.description,
      status: p.status,
      image: p.image,
      images: [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    await fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    loadProjects();
  };

  /* ================= PUBLISH ================= */
  const togglePublish = async (id) => {
    await fetch(`http://localhost:5000/api/projects/${id}/publish`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    loadProjects();
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">Project Management</h1>

      {/* ================= ADD / EDIT ================= */}
      <div className="project-upload-card">
        <h3>{editingId ? "Edit Project" : "Add New Project"}</h3>

        <input
          placeholder="Project Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Project Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* ✅ MAIN IMAGE (ONLY ONE INPUT) */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleMainImage(e.target.files[0])
          }
        />

        {form.image && (
          <img
            src={form.image}
            className="project-preview"
            alt="preview"
          />
        )}

        {/* 🔥 EXTRA IMAGES → ONLY IN EDIT MODE */}
        {editingId && (
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              handleExtraImages(e.target.files)
            }
          />
        )}

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={submitProject} disabled={loading}>
          {loading
            ? "Saving..."
            : editingId
            ? "Update Project"
            : "Add Project"}
        </button>

        {editingId && (
          <button
            className="cancel-btn"
            onClick={() => {
              setEditingId(null);
              setForm({
                title: "",
                description: "",
                status: "ongoing",
                image: "",
                images: [],
              });
            }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* ================= PROJECT LIST ================= */}
      <div className="admin-project-grid">
        {projects.map((p) => (
          <div key={p._id} className="admin-project-card">
            <div className="project-image-wrap">
              <img src={p.image} alt={p.title} />
              <span className={`project-badge ${p.status}`}>
                {p.status}
              </span>
            </div>

            <div className="project-info">
              <h4>{p.title}</h4>

              <div className="project-actions">
                <button onClick={() => editProject(p)}>
                  Edit
                </button>

                <button onClick={() => togglePublish(p._id)}>
                  {p.published ? "Unpublish" : "Publish"}
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteProject(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
