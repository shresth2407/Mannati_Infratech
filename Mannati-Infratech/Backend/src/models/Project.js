const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },

    // 🔥 EXISTING (single image)
    image: String,

    // ✅ NEW (future multiple images – OPTIONAL)
    images: {
      type: [String],
      default: [],
    },

    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
