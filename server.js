const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store messages in a JSON file
const messagesFile = path.join(__dirname, 'messages.json');

// Fetch messages
app.get('/messages', (req, res) => {
    fs.readFile(messagesFile, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Unable to fetch messages' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Post a new message
app.post('/message', (req, res) => {
    const { username, pfp, text, image } = req.body;
    const newMessage = { username, pfp, text, image, timestamp: new Date().toISOString() };

    fs.readFile(messagesFile, 'utf8', (err, data) => {
        let messages = [];
        if (!err) {
            messages = JSON.parse(data);
        }
        messages.push(newMessage);

        fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                res.status(500).json({ error: 'Unable to save message' });
                return;
            }
            res.status(200).json({ message: 'Message saved successfully' });
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
