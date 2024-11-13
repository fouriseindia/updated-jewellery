// controllers/offerController.js
const Offer = require('../models/OfferModel');
const path = require('path');

// Add Exclusive Discount

// Add Discover Jewellery
exports.addDiscoverJewellery = async (req, res) => {
    try {
        const { productName, discount } = req.body;
        const image = req.file.path;

        // Log the path of the uploaded image
        console.log('Uploaded image path:', image);

        const newOffer = new Offer({
            productName,
            discount,
            category: 'discoverJewellery',
            image,
        });

        await newOffer.save();
        res.status(201).json({ message: 'Discover jewellery added successfully!', offer: newOffer });
    } catch (error) {
        console.error('Error adding discover jewellery:', error); // Log error for debugging
        res.status(500).json({ message: 'Failed to add discover jewellery.', error });
    }
};

// Add Shop by Look
exports.addShopByLook = async (req, res) => {
    try {
        const { productName, discount } = req.body;
        const image = req.file.path;

        // Log the path of the uploaded image
        console.log('Uploaded image path:', image);

        const newOffer = new Offer({
            productName,
            discount,
            category: 'shopByLook',
            image,
        });

        await newOffer.save();
        res.status(201).json({ message: 'Shop by look added successfully!', offer: newOffer });
    } catch (error) {
        console.error('Error adding shop by look:', error); // Log error for debugging
        res.status(500).json({ message: 'Failed to add shop by look.', error });
    }
};

// Get Products by Category
exports.getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const offers = await Offer.find({ category });
        res.status(200).json(offers);
    } catch (error) {
        console.error('Error retrieving offers:', error); // Log error for debugging
        res.status(500).json({ message: 'Failed to retrieve offers.', error });
    }
};
