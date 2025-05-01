require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// In-memory storage for messages (you can replace this with a DB later)
let messages = [];

app.use(express.json());
app.use(express.static("public"));

// Route to get all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Route to send a message
app.post("/send-message", (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).send("Username and message are required.");
  }

  const newMessage = { username, message, timestamp: new Date() };
  messages.push(newMessage); // Save message to in-memory storage
  res.status(200).send("Message sent!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
