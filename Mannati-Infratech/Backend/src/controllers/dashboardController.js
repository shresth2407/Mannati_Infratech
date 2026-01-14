const Enquiry = require("../models/Enquiry");
const Gallery = require("../models/Gallery");

const getDashboardStats = async (req, res) => {
  try {
    // 📨 ENQUIRIES
    const totalEnquiries = await Enquiry.countDocuments();

    const pendingEnquiries = await Enquiry.countDocuments({
      status: { $in: ["new", "pending", "New"] },
    });

    // 🖼 GALLERY
    const totalGalleryItems = await Gallery.countDocuments();

    const publishedItems = await Gallery.countDocuments({
      status: { $in: ["published", "active"] },
    });

    const images = await Gallery.countDocuments({
      type: { $in: ["image", "Image"] },
    });

    const videos = await Gallery.countDocuments({
      type: { $in: ["video", "Video"] },
    });

    res.status(200).json({
      success: true,
      stats: {
        totalEnquiries,
        pendingEnquiries,
        totalGalleryItems,
        publishedItems,
        images,
        videos,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Dashboard stats failed",
    });
  }
};

module.exports = { getDashboardStats };
