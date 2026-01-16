const Project = require("../models/Project");

/* =========================
   CREATE PROJECT (ADMIN)
========================= */
exports.createProject = async (req, res) => {
  try {
    const { title, description, image, status } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({
        message: "Title, description & image are required",
      });
    }

    const project = await Project.create({
      title,
      description,
      image,
      status,
      published: false, // 🔥 explicit (important)
      images: [],       // 🔥 safe for future multiple images
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    res.status(500).json({
      message: "Project creation failed",
    });
  }
};

/* =========================
   GET ADMIN PROJECTS
========================= */
exports.getAdminProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.json({ projects });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load projects",
    });
  }
};

/* =========================
   GET PUBLIC PROJECTS
========================= */
exports.getPublicProjects = async (req, res) => {
  try {
    const projects = await Project.find({ published: true })
      .sort({ createdAt: -1 });

    res.json({ projects });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load public projects",
    });
  }
};

/* =========================
   PUBLISH / UNPUBLISH
========================= */
exports.togglePublishProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.published = !project.published;
    await project.save();

    res.json({
      success: true,
      published: project.published,
    });
  } catch (error) {
    console.error("PUBLISH ERROR:", error);
    res.status(500).json({ message: "Publish toggle failed" });
  }
};

/* =========================
   UPDATE PROJECT (EDIT)
========================= */
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // basic fields
    project.title = req.body.title ?? project.title;
    project.description = req.body.description ?? project.description;
    project.status = req.body.status ?? project.status;

    // replace main image (optional)
    if (req.body.image) {
      project.image = req.body.image;
    }

    // 🔥 append extra images safely
    if (Array.isArray(req.body.images) && req.body.images.length > 0) {
      if (!Array.isArray(project.images)) {
        project.images = [];
      }
      project.images.push(...req.body.images);
    }

    await project.save();

    res.json({
      success: true,
      project,
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

/* =========================
   DELETE PROJECT
========================= */
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
};
