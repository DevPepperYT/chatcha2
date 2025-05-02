const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const messagesFile = path.join(__dirname, 'messages.json');

app.get('/messages', (req, res) => {
  fs.readFile(messagesFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json([]);
    res.json(JSON.parse(data));
  });
});

app.post('/message', (req, res) => {
  const { username, pfp, text, image } = req.body;
  const newMsg = { username, pfp, text, image, timestamp: new Date().toISOString() };
  fs.readFile(messagesFile, 'utf8', (err, data) => {
    const msgs = err ? [] : JSON.parse(data);
    msgs.push(newMsg);
    fs.writeFile(messagesFile, JSON.stringify(msgs, null, 2), () => {
      res.status(200).json({ success: true });
    });
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
