const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

let messages = [];

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/send", (req, res) => {
  const { user, message } = req.body;
  messages.push({ user, message });
  fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));
  res.sendStatus(200);
});

if (fs.existsSync("messages.json")) {
  messages = JSON.parse(fs.readFileSync("messages.json"));
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
