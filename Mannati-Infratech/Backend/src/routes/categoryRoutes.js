const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");
const { protectAdmin } = require("../middlewares/authMiddleware");

router.post("/", protectAdmin, createCategory);
router.get("/", getCategories);
router.delete("/:id", protectAdmin, deleteCategory);

module.exports = router;
