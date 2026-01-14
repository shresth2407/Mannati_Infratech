const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middlewares/verifyAdmin");

// ✅ INLINE DASHBOARD HANDLER (NO CONTROLLER FILE)
router.get("/stats", verifyAdmin, async (req, res) => {
  try {
    res.json({
      enquiries: {
        total: 0,
        pending: 0,
        resolved: 0,
      },
      gallery: 0,
      projects: {
        total: 0,
        active: 0,
        completed: 0,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard stats error" });
  }
});

module.exports = router;
