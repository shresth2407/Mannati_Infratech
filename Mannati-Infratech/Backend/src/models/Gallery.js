const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
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
  },
  { _id: false }
);

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      lowercase: true,
      trim: true,
      default: "events",
    },

    eventDate: {
      type: Date,
      default: null,
    },

    eventTime: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    files: {
      type: [fileSchema],
      validate: [(v) => v.length > 0, "At least one file required"],
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

module.exports =
  mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);
