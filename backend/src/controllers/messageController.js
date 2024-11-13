const Message = require('../models/messageModel');

// Add a new message
exports.createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();
        res.status(201).json({ success: true, data: newMessage });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Fetch all messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: messages });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Message deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
