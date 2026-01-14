const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  format: String,
  bytes: Number,
});

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // optional (future use)
    category: {
      type: String,
      lowercase: true,
      trim: true,
    },

    // 🔥 MULTIPLE FILES
    files: {
      type: [fileSchema],
      required: true,
    },

    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);
