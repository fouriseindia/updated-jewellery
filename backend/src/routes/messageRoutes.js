const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// POST /api/messages - Add a new message
router.post('/messages', messageController.createMessage);

// GET /api/messages - Fetch all messages
router.get('/messages', messageController.getMessages);

// DELETE /api/messages/:id - Delete a message
router.delete('/messages/:id', messageController.deleteMessage);

module.exports = router;
