const Offer = require('../models/ExDiscoutModel'); // Ensure correct model path and name
const mongoose = require('mongoose');

// Add Exclusive Discount
exports.addExclusiveDiscount = async (req, res) => {
    try {
        console.log(req.body); // Log the request body for debugging
        const { productName, startingPrice, discount } = req.body;
        const category = 'exclusiveDiscount';

        const newOffer = new Offer({
            productName,
            startingPrice,
            discount,
            category,
        });

        await newOffer.save();
        res.status(201).json({ message: 'Exclusive discount added successfully!', offer: newOffer });
    } catch (error) {
        console.error('Error while adding exclusive discount:', error);
        res.status(500).json({ message: 'Failed to add exclusive discount.', error: error.message });
    }
};

exports.getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const offers = await Offer.find({ category });
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve offers.', error });
    }
};

exports.editOffer = async (req, res) => {
    const { id } = req.params; // Get the offer ID from the request parameters
    const updatedData = req.body; // Get the updated data from the request body

    try {
        const updatedOffer = await Offer.findByIdAndUpdate(id, updatedData, { new: true }); // Update and return the updated document
        if (!updatedOffer) {
            return res.status(404).json({ message: 'Offer not found' }); // Handle case where the offer doesn't exist
        }
        res.status(200).json(updatedOffer); // Return the updated offer
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // Handle server errors
    }
};

// Delete an offer
exports.deleteOffer = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters
    console.log('ID received for deletion:', id); // Log the ID for debugging

    // Check if ID is valid and exists
    if (!id) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
        // Ensure the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ObjectId' });
        }

        // Attempt to find and delete the product
        const deletedProduct = await Offer.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
   

