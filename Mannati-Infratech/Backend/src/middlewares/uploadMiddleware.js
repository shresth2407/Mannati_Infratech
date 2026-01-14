const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// 📌 Dynamic folder + resource type
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    const category = req.body.category || "general";

    return {
      folder: `mannati/${isVideo ? "videos" : "images"}/${category}`,
      resource_type: isVideo ? "video" : "image",
      allowed_formats: isVideo
        ? ["mp4", "mov", "avi", "mkv"]
        : ["jpg", "jpeg", "png", "webp"],
      public_id: `${Date.now()}-${file.originalname
        .split(".")[0]
        .replace(/\s+/g, "-")}`,
    };
  },
});

// 📦 Multer instance (multiple files)
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB (videos safe)
  },
});

module.exports = upload;
