const express = require("express");
const router = express.Router();
const multer = require("multer");

const { chatQuery, explainUploadedImage } = require("../controllers/chatQueryController");

const upload = multer({ dest: "uploads/" });

router.post("/query", chatQuery);
router.post("/explain-upload", upload.single("file"), explainUploadedImage);

module.exports = router;
