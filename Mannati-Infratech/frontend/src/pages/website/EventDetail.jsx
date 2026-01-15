import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../../components/website/Navbar";
import "../../components/website/website.css";

const API_BASE_URL = "http://localhost:5000";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/gallery`)
      .then((res) => res.json())
      .then((data) =>
        setEvent(data.galleries.find((g) => g._id === id))
      );
  }, [id]);

  if (!event) return null;

  return (
    <>
      <Helmet>
        <title>{event.title} | Mannati Infratech</title>
        <meta name="description" content={event.description} />
      </Helmet>

      <Navbar />

      <section className="events-hero">
        <h1>{event.title}</h1>
        <p>{event.description}</p>
      </section>

      {/* SIDE META PANEL */}
      <section className="event-meta-panel">
        <div>
          📅 {event.eventDate
            ? new Date(event.eventDate).toLocaleDateString()
            : "TBA"}
        </div>
        <div>⏰ {event.eventTime || "TBA"}</div>
        <div>📍 {event.location || "TBA"}</div>
      </section>

      {/* MAP */}
      {event.location && (
        <iframe
          className="event-map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            event.location
          )}&output=embed`}
          loading="lazy"
        />
      )}

      {/* FILES */}
      <section className="events-gallery">
        <div className="gallery-grid">
          {event.files.map((file, i) => (
            <div key={i} className="gallery-card premium">
              {file.type === "image" ? (
                <>
                  <img src={file.fileUrl} alt="" />
                  <a
                    href={file.fileUrl}
                    download
                    className="img-download-btn"
                  >
                    Download Image
                  </a>
                </>
              ) : (
                <>
                  <video
                    src={file.fileUrl}
                    controls
                    poster="/video-thumb.jpg"
                  />
                  <a
                    href={file.fileUrl}
                    download
                    className="img-download-btn"
                  >
                    Download Video
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default EventDetail;
