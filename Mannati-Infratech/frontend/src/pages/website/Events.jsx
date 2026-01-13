import { useEffect, useState } from "react";
import Navbar from "../../components/website/Navbar";
import { getGalleryImages } from "../../api/api";
import "../../components/website/website.css";

const Events = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const galleryImages = await getGalleryImages();
        setImages(galleryImages);
      } catch (error) {
        console.error("Gallery fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // 🔽 DIRECT DOWNLOAD FUNCTION (NO NEW TAB)
  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = downloadUrl;
      a.download = "event-image.jpg"; // default filename
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Image download failed:", error);
    }
  };

  return (
    <>
      {/* 🔝 NAVBAR */}
      <Navbar />

      {/* 🎨 HERO SECTION */}
      <section className="events-hero">
        <h1>Our Events & Gallery</h1>
        <p>
          Premium moments from our construction & infrastructure projects
        </p>
      </section>

      {/* 🖼️ GALLERY SECTION */}
      <section className="events-gallery">
        {loading && <p className="loading-text">Loading gallery...</p>}

        {!loading && images.length === 0 && (
          <p className="loading-text">No gallery images available</p>
        )}

        <div className="gallery-grid">
          {images.map((img) => (
            <div
              key={img._id}
              className="gallery-card premium"
              onClick={() => setSelectedImage(img)}
            >
              <img src={img.imageUrl} alt={img.title} />
              <div className="gallery-overlay">
                <span>View Image</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔍 IMAGE MODAL */}
      {selectedImage && (
        <div className="image-modal">
          <span
            className="close-btn"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </span>

          <img
            src={selectedImage.imageUrl}
            alt={selectedImage.title}
          />

          <button
            className="download-btn"
            onClick={() =>
              handleDownload(selectedImage.imageUrl)
            }
          >
            ⬇ Download Image
          </button>
        </div>
      )}
    </>
  );
};

export default Events;
