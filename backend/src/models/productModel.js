const mongoose = require('mongoose');
mongoose.set('strictPopulate', false);

// Define the product schema
const productSchema = new mongoose.Schema({
    productTitle: { type: String, required: true },
    mainImage: { type: String, required: true }, // Store the path or URL of the main image
    thumbnailImages: { type: [String] }, // Store an array of thumbnail image paths or URLs
    productVideo: { type: String }, // Store the path or URL of the product video
    productPrice: { type: Number, required: true },
    regularPrice: { type: Number },
    productDescription: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Change this to ObjectId
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Ensure this is ObjectId too
    shippingDetails: { type: String },
}, { timestamps: true });

// Create and export the product model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
