// models/Offer.js
const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    productName: { type: String},
    discount: { type: Number},
    category: { type: String},
    image: { type: String}, // Store the image path
});

module.exports = mongoose.model('Offer', OfferSchema);
