import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getAdminGallery,
  updateGallery,
  deleteGallery,
  getCategories,
  uploadGalleryImage,
} from "../../api/api";
import "../../components/admin/admin.css";

const Gallery = () => {
  const { token } = useAuth();

  // upload states
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  // data states
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    const imgs = await getAdminGallery(token);
    const cats = await getCategories();
    setImages(imgs);
    setCategories(cats);
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ======================
     UPLOAD IMAGE
  ====================== */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);

    setLoading(true);
    await uploadGalleryImage(formData, token);

    setFile(null);
    setTitle("");
    setCategory("");
    setLoading(false);

    loadData();
  };

  /* ======================
     TOGGLE PUBLISH
  ====================== */
  const togglePublish = async (img) => {
    const newStatus =
      img.status === "published" ? "unpublished" : "published";

    await updateGallery(img._id, { status: newStatus }, token);

    setImages((prev) =>
      prev.map((i) =>
        i._id === img._id ? { ...i, status: newStatus } : i
      )
    );
  };

  /* ======================
     DELETE IMAGE
  ====================== */
  const handleDelete = async (id) => {
    if (confirm("Delete image permanently?")) {
      await deleteGallery(id, token);
      loadData();
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Gallery Management</h2>

      {/* ======================
          UPLOAD FORM
      ====================== */}
      <form className="upload-form" onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Image title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {/* ======================
          GALLERY GRID
      ====================== */}
      <div className="admin-gallery-grid">
        {images.map((img) => (
          <div className="admin-gallery-card" key={img._id}>
            <img src={img.imageUrl} alt={img.title} />

            <p className="status-badge">
              Status: <b>{img.status}</b>
            </p>

            <button
              className={
                img.status === "published"
                  ? "btn-warning"
                  : "btn-success"
              }
              onClick={() => togglePublish(img)}
            >
              {img.status === "published"
                ? "Unpublish"
                : "Publish"}
            </button>

            <button
              className="danger"
              onClick={() => handleDelete(img._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
