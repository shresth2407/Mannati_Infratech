const Gallery = require("../models/Gallery");
const Enquiry = require("../models/Enquiry");
const Project = require("../models/Project");

exports.getAdminDashboardStats = async (req, res) => {
  try {
    const [
      galleryCount,
      enquiryCount,
      projectCount,
      completedProjects,
      ongoingProjects
    ] = await Promise.all([
      Gallery.countDocuments(),
      Enquiry.countDocuments(),
      Project.countDocuments(),
      Project.countDocuments({ status: "completed" }),
      Project.countDocuments({ status: "ongoing" }),
    ]);

    res.json({
      success: true,
      stats: {
        galleryCount,
        enquiryCount,
        projectCount,
        completedProjects,
        ongoingProjects,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
