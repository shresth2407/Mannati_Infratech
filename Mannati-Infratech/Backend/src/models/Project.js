const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    files: [
      {
        type: {
          type: String,
          enum: ["image", "video"],
        },
        fileUrl: String,
        publicId: String,
      },
    ],

    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
  },
  { timestamps: true }
);

// 🔥 VERY IMPORTANT FIX
module.exports =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
