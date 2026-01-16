import { useEffect, useState } from "react";
import {
  uploadGalleryFiles,
  getAdminGallery,
  updateGalleryItem,
  deleteGalleryItem,
} from "../../api/api";
import "./galleryAdmin.css";

const Gallery = () => {
  const [files, setFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "events",
    status: "draft",
    featured: false,
    eventDate: "",
    eventTime: "",
    location: "",
  });

  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD ================= */
  const loadGallery = async () => {
    try {
      const data = await getAdminGallery();
      setGalleries(data || []);
    } catch (err) {
      console.error("Admin gallery load failed", err);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  /* ================= RESET FORM ================= */
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      category: "events",
      status: "draft",
      featured: false,
      eventDate: "",
      eventTime: "",
      location: "",
    });
    setFiles([]);
    setEditingId(null);
  };

  /* ================= CREATE / UPDATE ================= */
  const submitGallery = async () => {
    if (!form.title) {
      alert("Title required");
      return;
    }

    setLoading(true);

    try {
      if (editingId) {
        // 🔥 UPDATE (append files)
        await updateGalleryItem(editingId, {
          ...form,
        });

        if (files.length > 0) {
          const fd = new FormData();
          files.forEach((f) => fd.append("files", f));
          await uploadGalleryFiles(fd);
        }
      } else {
        // 🔥 CREATE
        if (files.length === 0) {
          alert("Files required");
          return;
        }

        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) =>
          fd.append(k, v)
        );
        files.forEach((f) => fd.append("files", f));

        await uploadGalleryFiles(fd);
      }

      resetForm();
      loadGallery();
    } catch (err) {
      alert(err.message || "Gallery save failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const editGallery = (g) => {
    setEditingId(g._id);
    setForm({
      title: g.title,
      description: g.description || "",
      category: g.category || "events",
      status: g.status,
      featured: g.featured,
      eventDate: g.eventDate
        ? g.eventDate.slice(0, 10)
        : "",
      eventTime: g.eventTime || "",
      location: g.location || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="admin-gallery">
      <h1>Gallery Management</h1>

      {/* ================= ADD / EDIT ================= */}
      <div className="upload-card">
        <h3>{editingId ? "Edit Gallery" : "Add New Gallery"}</h3>

        <input
          placeholder="Event Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Event Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="date"
          value={form.eventDate}
          onChange={(e) =>
            setForm({ ...form, eventDate: e.target.value })
          }
        />

        <input
          type="time"
          value={form.eventTime}
          onChange={(e) =>
            setForm({ ...form, eventTime: e.target.value })
          }
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <label>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) =>
              setForm({ ...form, featured: e.target.checked })
            }
          />{" "}
          Featured Event
        </label>

        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => setFiles([...e.target.files])}
        />

        <button onClick={submitGallery} disabled={loading}>
          {loading
            ? "Saving..."
            : editingId
            ? "Update Gallery"
            : "Upload Gallery"}
        </button>

        {editingId && (
          <button className="cancel-btn" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </div>

      {/* ================= LIST ================= */}
      {galleries.map((g) => (
        <div key={g._id} className="gallery-block">
          <div className="gallery-header">
            <h3>
              {g.title} {g.featured && "⭐"}
            </h3>

            <div className="actions">
              <button onClick={() => editGallery(g)}>
                Edit
              </button>

              <button
                onClick={() =>
                  updateGalleryItem(g._id, {
                    status:
                      g.status === "published"
                        ? "draft"
                        : "published",
                  }).then(loadGallery)
                }
              >
                {g.status === "published"
                  ? "Unpublish"
                  : "Publish"}
              </button>

              <button
                className="danger"
                onClick={() => {
                  if (window.confirm("Delete gallery?")) {
                    deleteGalleryItem(g._id).then(loadGallery);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="media-grid">
            {g.files.map((file, i) =>
              file.type === "image" ? (
                <img key={i} src={file.fileUrl} alt="" />
              ) : (
                <video key={i} src={file.fileUrl} controls />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
