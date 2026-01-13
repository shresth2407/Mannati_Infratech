// backend/server.js

const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

// 🔹 Connect DB
connectDB();

// 🔹 Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const Admin = require("./src/models/Admin");

const createDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: "admin" });

    if (!adminExists) {
      await Admin.create({
        username: "admin",
        password: "admin123",
      });
      console.log("✅ Default admin created");
    }
  } catch (error) {
    console.error("Admin seed error:", error.message);
  }
};