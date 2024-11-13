// models/adminCredentialsModel.js
const mongoose = require('mongoose');

const adminCredentialsSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const AdminCredentials = mongoose.model('AdminCredentials', adminCredentialsSchema);

module.exports = AdminCredentials;
