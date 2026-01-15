const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const { protectAdmin } = require("../middlewares/authMiddleware");
const controller = require("../controllers/galleryController");

// ADMIN
router.post(
  "/",
  protectAdmin,
  upload.array("files", 20),
  controller.uploadGallery
);

router.get("/admin", protectAdmin, controller.getAdminGallery);
router.put("/:id", protectAdmin, controller.updateGallery);
router.delete("/:id", protectAdmin, controller.deleteGallery);

// PUBLIC
router.get("/", controller.getPublicGallery);

module.exports = router;
