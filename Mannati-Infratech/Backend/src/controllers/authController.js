const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");

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

    // 5️⃣ Response
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

/**
 * @desc    Forgot Password (Generate reset token)
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // 🔐 Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    admin.resetToken = resetToken;
    admin.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min
    await admin.save();

    /**
     * NOTE:
     * Abhi token response me bhej rahe hain
     * Later: email / WhatsApp me bhej denge
     */
    return res.status(200).json({
      success: true,
      message: "Password reset token generated",
      resetToken,
    });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * @desc    Reset Password
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password is required",
      });
    }

    const admin = await Admin.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // 🔒 Set new password
    admin.password = newPassword;
    admin.resetToken = undefined;
    admin.resetTokenExpiry = undefined;

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful. Please login again.",
    });
  } catch (error) {
    console.error("❌ Reset password error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  loginAdmin,
  forgotPassword,
  resetPassword,
};
