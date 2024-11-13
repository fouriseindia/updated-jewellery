const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('../controllers/OtpController');  // Correctly import these functions

// Define routes
router.post('/send-otp', sendOTP);   // Correctly reference the callback function
router.post('/verify-otp', verifyOTP);

module.exports = router;
