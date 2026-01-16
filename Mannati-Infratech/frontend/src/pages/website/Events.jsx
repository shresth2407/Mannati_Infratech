import { useEffect, useState } from "react";
import Navbar from "../../components/website/Navbar";
import "../../components/website/website.css";

const API_BASE_URL = "http://localhost:5000";
const DEFAULT_VIDEO_THUMB =
  "https://dummyimage.com/600x400/000/ffffff&text=Video";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [year, setYear] = useState("all");
  const [city, setCity] = useState("all");

  const [activeEvent, setActiveEvent] = useState(null);
  const [activeFile, setActiveFile] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/gallery`)
      .then((res) => res.json())
      .then((data) => setEvents(data.galleries || []));
  }, []);

  /* ======================
     FILTERS
  ====================== */
  const years = [
    ...new Set(
      events
        .map((e) =>
          e.eventDate ? new Date(e.eventDate).getFullYear() : null
        )
        .filter(Boolean)
    ),
  ];

  const cities = [
    ...new Set(events.map((e) => e.location).filter(Boolean)),
  ];

  const filteredEvents = events.filter((e) => {
    const y =
      year === "all" ||
      (e.eventDate &&
        new Date(e.eventDate).getFullYear().toString() === year);
    const c = city === "all" || e.location === city;
    return y && c;
  });

  return (
    <>
      <Navbar />

      <section className="events-hero">
        <h1>Events</h1>
        <p>Company activities & milestones</p>
      </section>

      {/* FILTER BAR */}
      <section className="event-filters">
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="all">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="all">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </section>

      {/* ======================
          EVENT LIST
      ====================== */}
      {!activeEvent && (
        <section className="events-gallery">
          <div className="event-list">
            {filteredEvents.map((e) => (
              <div
                key={e._id}
                className="event-card-compact colorful"
                onClick={() => setActiveEvent(e)}
              >
                <div className="event-thumb">
                  {e.files[0]?.type === "video" ? (
                    <img src={DEFAULT_VIDEO_THUMB} alt="video" />
                  ) : (
                    <img src={e.files[0]?.fileUrl} alt={e.title} />
                  )}
                  <div className="view-cta">View Event</div>
                </div>

                <div className="event-info">
                  <h3>{e.title}</h3>

                  {/* ✅ DESCRIPTION SHOWN HERE */}
                  {e.description && (
                    <p className="event-description">
                      {e.description}
                    </p>
                  )}

                  <p className="event-meta-text">
                    {e.eventDate
                      ? new Date(e.eventDate).toLocaleDateString()
                      : "Date TBA"}{" "}
                    • {e.eventTime || "Time TBA"}
                  </p>

                  <p className="event-location">
                    📍 {e.location || "Location TBA"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ======================
          EVENT INSIDE (ALL FILES)
      ====================== */}
      {activeEvent && (
        <section className="events-gallery">
          <button
            className="back-btn"
            onClick={() => {
              setActiveEvent(null);
              setActiveFile(null);
            }}
          >
            ← Back
          </button>

          <h2 className="folder-heading">{activeEvent.title}</h2>

          {/* ✅ DESCRIPTION ON DETAIL VIEW */}
          {activeEvent.description && (
            <p className="event-description center">
              {activeEvent.description}
            </p>
          )}

          <p className="event-meta-text center">
            {activeEvent.eventDate
              ? new Date(activeEvent.eventDate).toLocaleDateString()
              : "Date TBA"}{" "}
            • {activeEvent.eventTime || "Time TBA"} • 📍{" "}
            {activeEvent.location || "Location TBA"}
          </p>

          <div className="gallery-grid">
            {activeEvent.files.map((file, i) => (
              <div
                key={i}
                className="gallery-card premium"
                onClick={() => setActiveFile(file)}
              >
                {file.type === "image" ? (
                  <img src={file.fileUrl} alt="" />
                ) : (
                  <div className="video-thumb">
                    <video src={file.fileUrl} muted />
                    <span className="play-icon">▶</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ======================
          MODAL
      ====================== */}
      {activeFile && (
        <div className="image-modal">
          <span className="close-btn" onClick={() => setActiveFile(null)}>
            ✕
          </span>

          {activeFile.type === "image" ? (
            <>
              <img src={activeFile.fileUrl} alt="" />
              <a
                href={activeFile.fileUrl}
                download
                className="download-btn"
              >
                Download Image
              </a>
            </>
          ) : (
            <>
              <video src={activeFile.fileUrl} controls autoPlay />
              <a
                href={activeFile.fileUrl}
                download
                className="download-btn"
              >
                Download Video
              </a>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Events;
