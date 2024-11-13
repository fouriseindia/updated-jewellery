// src/models/profileModel.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, },
    address: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // Add createdAt field
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
