const multer = require("multer");
const path = require("path");

// 📂 Temporary local storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// 🔒 File filter (image + video)
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  const allowedVideoTypes = [
    "video/mp4",
    "video/mkv",
    "video/webm",
    "video/quicktime",
  ];

  if (
    allowedImageTypes.includes(file.mimetype) ||
    allowedVideoTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos are allowed"), false);
  }
};

// 🚀 Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB (videos safe)
  },
});

module.exports = upload;
