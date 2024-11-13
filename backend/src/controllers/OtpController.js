const express = require('express');
const axios = require('axios');
const OTP = require('../models/otpModel');
const router = express.Router();

// Generate random OTP function
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// Send OTP via Fast2SMS
exports.sendOTP=async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        // Check if phone number is already registered
        const existingOTP = await OTP.findOne({ phoneNumber });
        if (existingOTP) {
            return res.status(400).json({ success: false, message: 'Mobile number already registered. Please verify or use another number.' });
        }

        const otp = generateOTP();  // Generate OTP
        const message = `Your OTP is ${otp}. Please do not share it with anyone.`;

        const apiKey = process.env.FAST_TO_SMS_API_KEY;

        // Sending OTP via Fast2SMS API
        const response = await axios({
            method: 'POST',
            url: 'https://www.fast2sms.com/dev/bulkV2',
            headers: { authorization: apiKey },
            data: {
                route: 'v3',
                sender_id: 'TXTIND',
                message: message,
                language: 'english',
                flash: 0,
                numbers: phoneNumber,
            },
        });

        if (response.data.return) {
            // Save OTP to MongoDB with expiration time (5 minutes)
            const otpExpiry = Date.now() + 5 * 60 * 1000;
            await OTP.create({ phoneNumber, otp, expiresAt: otpExpiry });

            return res.status(200).json({
                success: true,
                message: 'OTP sent successfully',
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Failed to send OTP',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while sending the OTP',
            error: error.message,
        });
    }
}

// Verify OTP
exports.verifyOTP= async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;

        const storedOtp = await OTP.findOne({ phoneNumber });

        if (storedOtp) {
            // Check if OTP has expired
            if (Date.now() > storedOtp.expiresAt) {
                await OTP.deleteOne({ phoneNumber });  // Remove expired OTP
                return res.status(400).json({
                    success: false,
                    message: 'OTP expired. Please request a new one.',
                });
            }

            // Check if the OTP is valid
            if (storedOtp.otp === otp) {
                await OTP.deleteOne({ phoneNumber });  // Remove OTP after successful verification
                return res.status(200).json({
                    success: true,
                    message: 'OTP verified successfully',
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid OTP. Please try again.',
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'OTP not found. Please request a new one.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while verifying the OTP',
            error: error.message,
        });
    }
}
