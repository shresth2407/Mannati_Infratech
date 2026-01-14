const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔥 GALLERY UPLOAD HELPER
const uploadToCloudinary = async (filePath, type = "image") => {
  return await cloudinary.uploader.upload(filePath, {
    resource_type: type, // image | video
    folder:
      type === "video"
        ? "mannati/gallery/videos"
        : "mannati/gallery/images",
  });
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
};
