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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("events");
  const [status, setStatus] = useState("draft");
  const [featured, setFeatured] = useState(false);

  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");

  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadGallery = async () => {
    try {
      const galleries = await getAdminGallery(); // 🔥 array directly
      setGalleries(galleries);
    } catch (err) {
      console.error("Admin gallery load failed", err);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleUpload = async () => {
    if (!title || files.length === 0) {
      alert("Title & files required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("featured", featured);
    formData.append("eventDate", eventDate);
    formData.append("eventTime", eventTime);
    formData.append("location", location);

    files.forEach((f) => formData.append("files", f));

    setLoading(true);
    try {
      await uploadGalleryFiles(formData);
      setFiles([]);
      setTitle("");
      setDescription("");
      setEventDate("");
      setEventTime("");
      setLocation("");
      setFeatured(false);
      loadGallery();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-gallery">
      <h1>Gallery Management</h1>

      {/* UPLOAD */}
      <div className="upload-card">
        <input
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input type="date" onChange={(e) => setEventDate(e.target.value)} />
        <input type="time" onChange={(e) => setEventTime(e.target.value)} />
        <input
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />{" "}
          Featured Event
        </label>

        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => setFiles([...e.target.files])}
        />

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* LIST */}
      {galleries.length === 0 && <p>No gallery found</p>}

      {galleries.map((g) => (
        <div key={g._id} className="gallery-block">
          <div className="gallery-header">
            <h3>
              {g.title} {g.featured && "⭐"}
            </h3>

            <div className="actions">
              <button
                onClick={() =>
                  updateGalleryItem(g._id, {
                    status:
                      g.status === "published" ? "draft" : "published",
                  }).then(loadGallery)
                }
              >
                {g.status === "published" ? "Unpublish" : "Publish"}
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
