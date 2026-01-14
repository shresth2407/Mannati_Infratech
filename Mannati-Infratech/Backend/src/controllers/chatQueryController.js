const fs = require("fs");
const Gallery = require("../models/Gallery");
const Project = require("../models/Project");
const Enquiry = require("../models/Enquiry");
const axios = require("axios");

/* 🤖 AI summary */
const aiSummarize = async (prompt) => {
  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Explain in simple Hinglish." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return res.data.choices[0].message.content;
  } catch {
    return "Yeh Mannati Infratech se related ek work lagta hai.";
  }
};

/* 💬 NORMAL CHAT */
const chatQuery = async (req, res) => {
  try {
    const { message, lead } = req.body;
    const text = message.toLowerCase();

    // Lead
    if (text.includes("quotation") || text.includes("contact")) {
      if (lead) {
        await Enquiry.create({
          name: lead.name,
          phone: lead.phone,
          message: "Lead from chatbot",
        });
        return res.json({
          reply: "Thank you 😊 team jaldi contact karegi.",
        });
      }

      return res.json({
        reply: "Zaroor 😊 apna naam aur phone number bhejiye.",
        action: "COLLECT_LEAD",
      });
    }

    // Project explain
    if (text.includes("project")) {
      const project = await Project.findOne().sort({ createdAt: -1 });
      if (!project) {
        return res.json({ reply: "Abhi project data available nahi hai." });
      }

      const reply = await aiSummarize(
        `Explain project: ${project.title} - ${project.description}`
      );
      return res.json({ reply });
    }

    // General
    const reply = await aiSummarize(message);
    return res.json({ reply });
  } catch {
    return res.json({
      reply: "Aap project, gallery ya contact ke baare me pooch sakte ho 😊",
    });
  }
};

/* 🖼 IMAGE UPLOAD & EXPLAIN */
const explainUploadedImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ reply: "Koi file upload nahi hui." });
    }

    const filename = req.file.originalname.toLowerCase();

    // 🔍 Match with gallery image
    const image = await Gallery.findOne({
      imageUrl: { $regex: filename.split(".")[0], $options: "i" },
    });

    fs.unlinkSync(req.file.path); // cleanup temp file

    if (!image) {
      return res.json({
        reply:
          "❌ Yeh image/document Mannati Infratech ki website se related nahi lagta.",
      });
    }

    const reply = await aiSummarize(
      `Explain this construction image: ${image.title}`
    );

    return res.json({ reply });
  } catch {
    return res.json({
      reply: "Image verify karne me problem aayi.",
    });
  }
};

module.exports = { chatQuery, explainUploadedImage };
