const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const {
  uploadGalleryImage,
  getAdminGallery,
  getPublishedGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");
const { protectAdmin } = require("../middlewares/authMiddleware");

// Public
router.get("/", getPublishedGallery);

// Admin
router.get("/admin", protectAdmin, getAdminGallery);
router.post("/", protectAdmin, upload.single("image"), uploadGalleryImage);
router.put("/:id", protectAdmin, updateGallery);
router.delete("/:id", protectAdmin, deleteGallery);

module.exports = router;
