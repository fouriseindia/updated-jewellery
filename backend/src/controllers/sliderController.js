const Slider = require('../models/sliderModel');
const path = require('path');
const fs = require('fs');

// Add a new slider
exports.addSlider = (req, res) => {
    console.log('Received request to add a new slider');
    
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'At least one image file is required' });
    }

    const { title, description, price, discount, swiper } = req.body;
    console.log('Request Body:', { title, description, price, discount, swiper });

    // Check if required fields are missing
    if (!title || !description || !price || !discount) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const imageNames = req.files.map(file => file.filename);
    console.log('Uploaded Images:', imageNames);

    const newSlider = new Slider({
        title,
        description,
        price,
        discount,
        image: imageNames.join(','),
        swiper
    });

    newSlider.save()
        .then(slider => {
            console.log('Slider added successfully:', slider);
            res.status(201).json({ message: 'Slider added successfully', slider });
        })
        .catch(error => {
            console.error('Error adding slider:', error);  // Log the error for debugging
            res.status(500).json({ message: 'Error adding slider', error: error.message });
        });
};

// Get Sliders
exports.getSliders = async (req, res) => {
    try {
        // Fetch all sliders without any condition
        const sliders = await Slider.find();
        

        if (sliders.length === 0) {
            return res.status(404).json({ message: 'No sliders found' });
        }

        res.status(200).json(sliders);  // Return the sliders in response
    } catch (err) {
        console.error('Error fetching sliders:', err);
        res.status(500).json({ message: 'Error fetching sliders', error: err.message });
    }
};


// Delete a slider by ID
exports.deleteSlider = async (req, res) => {
    try {
        const sliderId = req.params.id;
        const slider = await Slider.findByIdAndDelete(sliderId);
        if (!slider) {
            return res.status(404).json({ message: 'Slider not found' });
        }
        res.json({ message: 'Slider deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Edit a slider
exports.editSlider = async (req, res) => {
    try {
        const sliderId = req.params.id;
        const { title, description, price, discount, swiper } = req.body;

        // Collect the uploaded image filenames if new images are uploaded
        let images = req.files ? req.files.map(file => file.filename) : [];

        // Find the slider by its ID to get the current slider data
        const slider = await Slider.findById(sliderId);
        if (!slider) {
            return res.status(404).json({ message: 'Slider not found' });
        }

        // If no new images are uploaded, retain the old images
        if (images.length === 0) {
            images = slider.image.split(','); // Retain the existing images
        }

        // Prepare the data to update the slider
        const updatedSlider = await Slider.findByIdAndUpdate(sliderId, {
            title,
            description,
            price,
            discount,
            swiper,
            image: images.join(',') // Update the image field with the new or retained images
        }, { new: true });

        // Check if the slider was updated successfully
        if (!updatedSlider) {
            return res.status(404).json({ message: 'Slider update failed' });
        }

        // Return the updated slider as a response
        res.json({ slider: updatedSlider });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
// Get a slider by ID
exports.getSliderById = async (req, res) => {
    try {
      const sliderId = req.params.id;
      const slider = await Slider.findById(sliderId); // Use your ORM/ODM (e.g., Mongoose for MongoDB)
      
      if (!slider) {
        return res.status(404).json({ message: 'Slider not found' });
      }
  
      res.status(200).json(slider); // Send the slider data as JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  