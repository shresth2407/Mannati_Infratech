const Enquiry = require("../models/Enquiry");
const Gallery = require("../models/Gallery");

/**
 * @desc    Get dashboard statistics (Admin)
 * @route   GET /api/dashboard/stats
 * @access  Private (Admin)
 */
const getDashboardStats = async (req, res) => {
  try {
    // 🔵 Enquiries
    const totalEnquiries = await Enquiry.countDocuments();
    const pendingEnquiries = await Enquiry.countDocuments({ status: "New" });
    const resolvedEnquiries = await Enquiry.countDocuments({
      status: { $in: ["Contacted", "Closed"] },
    });

    // 🖼️ Gallery
    const totalGalleryImages = await Gallery.countDocuments();

    // 🟢 Projects (future-ready placeholders)
    const totalProjects = 0;
    const activeProjects = 0;
    const completedProjects = 0;

    return res.status(200).json({
      success: true,
      stats: {
        enquiries: {
          total: totalEnquiries,
          pending: pendingEnquiries,
          resolved: resolvedEnquiries,
        },
        gallery: totalGalleryImages,
        projects: {
          total: totalProjects,
          active: activeProjects,
          completed: completedProjects,
        },
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Dashboard stats fetch failed",
    });
  }
};

module.exports = { getDashboardStats };
