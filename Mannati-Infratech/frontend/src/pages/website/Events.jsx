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
  const [activeFile, setActiveFile] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/gallery`)
      .then((res) => res.json())
      .then((data) => setEvents(data.galleries || []));
  }, []);

  /* ===== FILTERS ===== */
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

      {/* EVENT LIST */}
      <section className="events-gallery">
        <div className="event-list">
          {filteredEvents.map((e) => {
            const firstFile = e.files[0];

            return (
              <div
                key={e._id}
                className="event-card-compact colorful"
                onClick={() => setActiveFile(firstFile)} // 🔥 FIX HERE
              >
                <div className="event-thumb">
                  {firstFile?.type === "video" ? (
                    <img src={DEFAULT_VIDEO_THUMB} alt="video" />
                  ) : (
                    <img src={firstFile?.fileUrl} alt={e.title} />
                  )}

                  {/* VISUAL ONLY */}
                  <div className="view-cta">View</div>
                </div>

                <div className="event-info">
                  <h3>{e.title}</h3>

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
            );
          })}
        </div>
      </section>

      {/* MODAL */}
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
