// backend/src/utils/generateToken.js

const jwt = require("jsonwebtoken");

/**
 * 🔐 Generate JWT Token
 * @param {String} id - Admin MongoDB ID
 * @param {String} role - User role (admin)
 * @returns {String} JWT token
 */
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d", // token valid for 1 day
    }
  );
};

module.exports = generateToken;
