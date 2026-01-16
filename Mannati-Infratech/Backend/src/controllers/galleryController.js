const fs = require("fs");
const path = require("path");
const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

/* =========================
   HELPERS
========================= */

const getFileType = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return "image";
  if ([".mp4", ".mov", ".avi", ".mkv", ".webm"].includes(ext)) return "video";
  return null;
};

/* =========================
   ADMIN – UPLOAD
========================= */

const uploadGallery = async (req, res) => {
  try {
    const {
      title,
      category,
      status,
      description,
      eventDate,
      eventTime,
      location,
      featured,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const files = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(
        file.path,
        {
          resource_type: "auto",
          folder: `mannati/${category || "events"}`,
        }
      );

      files.push({
        type: result.resource_type === "video" ? "video" : "image",
        fileUrl: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        bytes: result.bytes,
      });

      // safe cleanup
      try {
        fs.unlinkSync(file.path);
      } catch (e) {
        console.warn("Temp file delete skipped");
      }
    }

    const gallery = await Gallery.create({
      title,
      category,
      description,
      eventDate: eventDate || null,
      eventTime: eventTime || "",
      location: location || "",
      featured: featured === "true" || featured === true,
      status: status || "draft",
      files,
    });

    res.status(201).json({
      success: true,
      gallery,
    });
  } catch (err) {
    console.error("UPLOAD FAILED:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Upload failed",
    });
  }
};


/* =========================
   ADMIN – GET ALL
========================= */

const getAdminGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.json({ success: true, galleries });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

/* =========================
   PUBLIC – GET EVENTS
========================= */

const getPublicGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find({
      status: "published",
    })
      .sort({ eventDate: -1, createdAt: -1 })
      .lean(); // 🔥 important (prevents mongoose issues)

    res.json({
      success: true,
      galleries: galleries || [],
    });
  } catch (err) {
    console.error("PUBLIC GALLERY ERROR:", err);
    res.status(500).json({
      success: false,
      galleries: [],
    });
  }
};

/* =========================
   UPDATE
========================= */

const updateGallery = async (req, res) => {
  try {
    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, gallery: updated });
  } catch {
    res.status(500).json({ success: false });
  }
};

/* =========================
   DELETE
========================= */

const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ success: false });

    for (const file of gallery.files) {
      await cloudinary.uploader.destroy(file.publicId, {
        resource_type: file.type === "video" ? "video" : "image",
      });
    }

    await gallery.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  uploadGallery,
  getAdminGallery,
  getPublicGallery,
  updateGallery,
  deleteGallery,
};
