const fs = require("fs");
const Gallery = require("../models/Gallery");
const { uploadToCloudinary, cloudinary } = require("../config/cloudinary");

/**
 * 📤 ADMIN – Upload Gallery (Multiple Images + Videos)
 * POST /api/gallery
 */
const uploadGallery = async (req, res) => {
  try {
    const { title, category, status } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const files = [];

    for (const file of req.files) {
      const isVideo = file.mimetype.startsWith("video");
      const type = isVideo ? "video" : "image";

      const result = await uploadToCloudinary(file.path, type);

      files.push({
        type,
        fileUrl: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        bytes: result.bytes,
      });

      // 🧹 remove temp file
      fs.unlinkSync(file.path);
    }

    const gallery = await Gallery.create({
      title,
      category,
      status: status || "draft",
      files,
    });

    res.status(201).json({
      success: true,
      message: "Gallery uploaded successfully",
      gallery,
    });
  } catch (error) {
    console.error("Gallery upload error:", error);
    res.status(500).json({
      success: false,
      message: "Gallery upload failed",
    });
  }
};

/**
 * 🔐 ADMIN – Get all gallery items
 */
const getAdminGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.json({ success: true, galleries });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * 🌐 PUBLIC – Get published gallery
 */
const getPublicGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find({ status: "published" }).sort({
      createdAt: -1,
    });

    res.json({ success: true, galleries });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * ✏️ ADMIN – Update gallery meta
 */
const updateGallery = async (req, res) => {
  try {
    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, gallery: updated });
  } catch {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

/**
 * 🗑 ADMIN – Delete gallery (DB + Cloudinary)
 */
const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res
        .status(404)
        .json({ success: false, message: "Gallery not found" });
    }

    for (const file of gallery.files) {
      await cloudinary.uploader.destroy(file.publicId, {
        resource_type: file.type,
      });
    }

    await gallery.deleteOne();

    res.json({ success: true, message: "Gallery deleted successfully" });
  } catch {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

module.exports = {
  uploadGallery,
  getAdminGallery,
  getPublicGallery,
  updateGallery,
  deleteGallery,
};
