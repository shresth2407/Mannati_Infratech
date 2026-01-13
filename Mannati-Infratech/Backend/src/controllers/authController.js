const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");

/**
 * @desc    Admin Login
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginAdmin = async (req, res) => {
  console.log("🔥 LOGIN API HIT");
  console.log("📦 BODY:", req.body);

  try {
    const { username, password } = req.body;

    // 1️⃣ Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // 2️⃣ Find admin
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3️⃣ Password check
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4️⃣ Token generate
    const token = generateToken(admin._id, admin.role);

    // 5️⃣ FINAL RESPONSE (IMPORTANT: return)
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { loginAdmin };
