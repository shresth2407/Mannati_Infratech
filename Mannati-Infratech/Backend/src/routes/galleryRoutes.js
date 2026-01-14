const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const { protectAdmin } = require("../middlewares/authMiddleware");

const {
  uploadGallery,
  getAdminGallery,
  getPublicGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController"); // ✅ FIXED

// 🔐 ADMIN
router.post(
  "/",
  protectAdmin,
  upload.array("files", 20),
  uploadGallery
);

router.get("/admin", protectAdmin, getAdminGallery);
router.put("/:id", protectAdmin, updateGallery);
router.delete("/:id", protectAdmin, deleteGallery);

// 🌐 PUBLIC
router.get("/", getPublicGallery);

module.exports = router;
