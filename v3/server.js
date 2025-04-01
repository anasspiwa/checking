const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const port = 3000;

// Use LocalAuth to cache session data
let client = new Client({
    authStrategy: new LocalAuth(), // This will use the cached session from `.wwebjs_cache`
});

// When QR code is generated, it will be displayed in the terminal
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// When the client is ready, it will log that it is ready
client.on('ready', () => {
    console.log('✅ WhatsApp Web Client is ready!');
});

// Function to send a WhatsApp notification with the keyword
function sendWhatsAppNotification(keyword) {
    const chatId = '212...@c.us';  // Replace with the correct phone number in the proper format
    client.sendMessage(chatId, `📢 The keyword was found: ${keyword}`);
}

client.initialize();

// API endpoint to send messages through WhatsApp
app.get('/send-message', (req, res) => {
    const keyword = req.query.keyword;
    if (keyword) {
        sendWhatsAppNotification(keyword);
        res.send('✅ Message sent through WhatsApp!');
    } else {
        res.send('⚠️ No keyword specified!');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
