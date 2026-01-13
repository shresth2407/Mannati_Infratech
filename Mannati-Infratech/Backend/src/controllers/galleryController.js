const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

/**
 * @desc    Upload gallery image
 * @route   POST /api/gallery
 * @access  Admin
 */
const uploadGalleryImage = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const image = await Gallery.create({
      title: title || "Gallery Image",
      category: category || null,
      imageUrl: req.file.path,
      publicId: req.file.filename,
      status: "published", // default
    });

    res.status(201).json({
      success: true,
      image,
    });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};

/**
 * @desc    Get all gallery images (Admin)
 * @route   GET /api/gallery/admin
 * @access  Admin
 */
const getAdminGallery = async (req, res) => {
  try {
    const images = await Gallery.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      images,
    });
  } catch (error) {
    console.error("Admin gallery error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * @desc    Get published gallery images (Public)
 * @route   GET /api/gallery
 * @access  Public
 */
const getPublishedGallery = async (req, res) => {
  try {
    const images = await Gallery.find({ status: "published" })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      images,
    });
  } catch (error) {
    console.error("Public gallery error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * @desc    Update gallery image (title / category / status)
 * @route   PUT /api/gallery/:id
 * @access  Admin
 */
const updateGallery = async (req, res) => {
  try {
    const { title, category, status } = req.body;

    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // 🔥 SAFE PARTIAL UPDATE
    if (title !== undefined) image.title = title;
    if (category !== undefined) image.category = category;
    if (status !== undefined) image.status = status;

    await image.save();

    res.json({
      success: true,
      image,
    });
  } catch (error) {
    console.error("Update gallery error:", error.message);
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};

/**
 * @desc    Delete gallery image (Cloudinary + DB)
 * @route   DELETE /api/gallery/:id
 * @access  Admin
 */
const deleteGallery = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete from DB
    await image.deleteOne();

    res.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete gallery error:", error.message);
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

module.exports = {
  uploadGalleryImage,
  getAdminGallery,
  getPublishedGallery,
  updateGallery,
  deleteGallery,
};
