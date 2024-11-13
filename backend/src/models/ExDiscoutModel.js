const mongoose = require('mongoose');

const exDiscountSchema = new mongoose.Schema({
    productName: { type: String, required: true }, // Added required validation
    startingPrice: { type: Number, required: true }, // Added required validation
    discount: { type: Number, required: true, min: 0, max: 100 }, // Added min/max validation
    category: { type: String, default: 'exclusiveDiscount' }, // Default value is set here
    // Removed the image field
});

// Ensure the model name is capitalized
module.exports = mongoose.model('ExDiscount', exDiscountSchema);
