const express = require("express");
const router = express.Router();

const {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
} = require("../controllers/enquiryController");

const { protectAdmin } = require("../middlewares/authMiddleware");

router.post("/", createEnquiry);
router.get("/", protectAdmin, getAllEnquiries);

// 🔥 THIS LINE MUST EXIST
router.patch("/:id/status", protectAdmin, updateEnquiryStatus);

module.exports = router;
