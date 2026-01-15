const fs = require("fs");
const path = require("path");
const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

// helper
const getFileType = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  const imageExt = [".jpg", ".jpeg", ".png", ".webp"];
  const videoExt = [".mp4", ".mov", ".avi", ".mkv", ".webm"];

  if (imageExt.includes(ext)) return "image";
  if (videoExt.includes(ext)) return "video";
  return null;
};

/**
 * ADMIN – Upload Event Gallery
 */
const uploadGallery = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      status,
      eventDate,
      eventTime,
      location,
      featured,
    } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title required" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const files = [];

    for (const file of req.files) {
      const type = getFileType(file.originalname);
      if (!type) continue;

      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: type === "video" ? "video" : "image",
        folder: "mannati/events",
      });

      files.push({
        type,
        fileUrl: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        bytes: result.bytes,
      });

      try {
        fs.unlinkSync(file.path);
      } catch {}
    }

    const gallery = await Gallery.create({
      title,
      description,
      category,
      status: status || "draft",

      eventDate: eventDate ? new Date(eventDate) : null,
      eventTime: eventTime || "",
      location: location || "",

      featured: featured === "true" || featured === true,

      files,
    });

    res.status(201).json({ success: true, gallery });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

/**
 * ADMIN – Get all
 */
const getAdminGallery = async (req, res) => {
  const galleries = await Gallery.find().sort({ createdAt: -1 });
  res.json({ success: true, galleries });
};

/**
 * PUBLIC – Published events
 */
const getPublicGallery = async (req, res) => {
  const galleries = await Gallery.find({ status: "published" }).sort({
    createdAt: -1,
  });
  res.json({ success: true, galleries });
};

/**
 * ADMIN – Update
 */
const updateGallery = async (req, res) => {
  const updated = await Gallery.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, gallery: updated });
};

/**
 * ADMIN – Delete
 */
const deleteGallery = async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);
  if (!gallery) return res.status(404).json({ success: false });

  for (const file of gallery.files) {
    await cloudinary.uploader.destroy(file.publicId, {
      resource_type: file.type,
    });
  }

  await gallery.deleteOne();
  res.json({ success: true });
};

module.exports = {
  uploadGallery,
  getAdminGallery,
  getPublicGallery,
  updateGallery,
  deleteGallery,
};
