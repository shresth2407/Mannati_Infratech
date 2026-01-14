const express = require("express");
const cors = require("cors");

/* =========================
   INIT APP
========================= */
const app = express();

/* =========================
   GLOBAL MIDDLEWARES
   ✅ ORDER FIXED
========================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES IMPORT
========================= */
const authRoutes = require("./routes/authRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const adminRoutes = require("./routes/admin.routes");
const chatRoutes = require("./routes/chatRoutes");

/* =========================
   ROUTES REGISTER
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);

/* =========================
   TEST / HEALTH ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("✅ Mannati Infratech API is running");
});

module.exports = app;
