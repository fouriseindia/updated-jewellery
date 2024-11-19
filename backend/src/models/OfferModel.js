// models/Offer.js
const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    productName: { type: String},
    discount: { type: Number},
    category: { type: String},
    images: { type: [String] }, // Array to store multiple image paths
});

module.exports = mongoose.model('Offer', OfferSchema);