import { useEffect, useState } from "react";
import {
  uploadGalleryFiles,
  getAdminGallery,
  updateGalleryItem,
  deleteGalleryItem,
} from "../../api/api.js";
import "../../components/admin/admin.css";

const Gallery = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("draft");
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔄 Load gallery
  const loadGallery = async () => {
    try {
      const data = await getAdminGallery();
      setGalleries(data || []);
    } catch (err) {
      console.error("Gallery load failed", err);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  // 📤 Upload gallery
  const handleUpload = async () => {
    if (!title || files.length === 0) {
      alert("Title and files required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("status", status);
    files.forEach((file) => formData.append("files", file));

    try {
      setLoading(true);
      await uploadGalleryFiles(formData);
      setTitle("");
      setFiles([]);
      setStatus("draft");
      loadGallery();
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Publish / Unpublish
  const togglePublish = async (item) => {
    await updateGalleryItem(item._id, {
      status: item.status === "published" ? "draft" : "published",
    });
    loadGallery();
  };

  // 🗑 Delete
  const removeGallery = async (id) => {
    if (!window.confirm("Delete this gallery?")) return;
    await deleteGalleryItem(id);
    loadGallery();
  };

  return (
    <div className="admin-content">
      <h1>Gallery Management</h1>

      {/* CREATE */}
      <div className="card">
        <h3>Create Gallery</h3>

        <input
          type="text"
          placeholder="Gallery Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => setFiles([...e.target.files])}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* LIST */}
      <div className="grid">
        {galleries.map((item) => (
          <div className="gallery-admin-card" key={item._id}>
            <h4>{item.title}</h4>

            <div className="preview-grid">
              {item.type === "image" ? (
                <img src={item.fileUrl} alt="" />
              ) : (
                <video src={item.fileUrl} controls />
              )}
            </div>

            <div className="meta">
              <p><b>Status:</b> {item.status}</p>
            </div>

            <div className="actions">
              <button onClick={() => togglePublish(item)}>
                {item.status === "published" ? "Unpublish" : "Publish"}
              </button>
              <button
                className="danger"
                onClick={() => removeGallery(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {galleries.length === 0 && (
          <p style={{ textAlign: "center" }}>No gallery items</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
