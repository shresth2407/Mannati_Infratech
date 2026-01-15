const Project = require("../models/Project");

/* CREATE PROJECT */
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* GET ADMIN PROJECTS */
exports.getAdminProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json({ success: true, projects });
};

/* PUBLIC PROJECTS */
exports.getPublicProjects = async (req, res) => {
  const projects = await Project.find();
  res.json({ success: true, projects });
};

/* DELETE */
exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
