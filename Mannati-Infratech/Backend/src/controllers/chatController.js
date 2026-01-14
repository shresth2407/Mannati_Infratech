const axios = require("axios");

const aiFallback = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant for a construction company website. Reply shortly in Hinglish.",
          },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({
      success: true,
      reply: response.data.choices[0].message.content,
    });
  } catch (err) {
    res.json({
      success: true,
      reply:
        "Main aapki madad karna chahta hoon 😊 Aap website ke sections jaise Projects, Contact ya Services ke baare me pooch sakte ho.",
    });
  }
};

module.exports = { aiFallback };
