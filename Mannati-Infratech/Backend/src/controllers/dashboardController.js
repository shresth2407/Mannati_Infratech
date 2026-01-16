const Gallery = require("../models/Gallery");
const Enquiry = require("../models/Enquiry");
const Project = require("../models/Project");

const getDashboardStats = async (req, res) => {
  try {
    /* ================= ENQUIRIES ================= */
    const totalEnquiries = await Enquiry.countDocuments();

    const pendingEnquiries = await Enquiry.countDocuments({
      status: { $ne: "closed" },
    });

    const resolvedEnquiries = await Enquiry.countDocuments({
      status: "closed",
    });

    /* ================= GALLERY ================= */
/* ================= GALLERY ================= */
const galleries = await Gallery.find({}, { files: 1 });

let galleryItems = 0;

galleries.forEach((gallery) => {
  if (Array.isArray(gallery.files)) {
    gallery.files.forEach((file) => {
      // 🔥 count EVERYTHING (image, video, document, future types)
      if (file.fileUrl) {
        galleryItems += 1;
      }
    });
  }
});


    /* ================= PROJECTS ================= */
    const totalProjects = await Project.countDocuments();

    const activeProjects = await Project.countDocuments({
      status: "ongoing",
      published: true,
    });

    const completedProjects = await Project.countDocuments({
      status: "completed",
      published: true,
    });

    res.json({
      success: true,
      stats: {
        enquiries: {
          total: totalEnquiries,
          pending: pendingEnquiries,
          resolved: resolvedEnquiries,
        },
        gallery: galleryItems,
        projects: {
          total: totalProjects,
          active: activeProjects,
          completed: completedProjects,
        },
      },
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({
      success: false,
      message: "Dashboard stats failed",
    });
  }
};

module.exports = { getDashboardStats };
