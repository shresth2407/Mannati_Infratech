import { useState } from "react";
import "./chatbot.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 Main Mannati Infratech ka assistant hoon." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async (payload) => {
    const res = await fetch("http://localhost:5000/api/chat/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      "http://localhost:5000/api/chat/explain-upload",
      {
        method: "POST",
        body: formData,
      }
    );
    return res.json();
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);

    const data = await sendMessage({ message: input });
    setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    setInput("");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: `📤 Uploaded: ${file.name}` },
    ]);

    const data = await uploadFile(file);
    setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
  };

  return (
    <>
      <div className="chatbot-toggle" onClick={() => setOpen(!open)}>
        💬
      </div>

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            Mannati Chat
            <span onClick={() => setOpen(false)}>✖</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <label className="upload-btn">
              📎
              <input
                type="file"
                hidden
                accept="image/*,.pdf"
                onChange={handleFileUpload}
              />
            </label>

            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
