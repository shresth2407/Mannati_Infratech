const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middlewares/verifyAdmin");

/* 🔥 CONTROLLER IMPORT – VERY IMPORTANT */
const {
  createProject,
  getAdminProjects,
  getPublicProjects,
  togglePublishProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

/* =========================
   ADMIN ROUTES
========================= */

// CREATE
router.post("/", verifyAdmin, createProject);

// GET ALL (ADMIN)
router.get("/admin", verifyAdmin, getAdminProjects);

// PUBLISH / UNPUBLISH
router.put("/:id/publish", verifyAdmin, togglePublishProject);

// UPDATE (EDIT)
router.put("/:id", verifyAdmin, updateProject);

// DELETE
router.delete("/:id", verifyAdmin, deleteProject);

/* =========================
   PUBLIC ROUTES
========================= */

// GET PUBLISHED PROJECTS (WEBSITE)
router.get("/", getPublicProjects);

module.exports = router;
