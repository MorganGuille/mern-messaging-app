const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    // senderID: { type: String },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Message', MessageSchema);