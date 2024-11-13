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
        console.log('Sliders fetched:', sliders);  // Log the sliders fetched to check

        if (sliders.length === 0) {
            return res.status(404).json({ message: 'No sliders found' });
        }

        res.status(200).json(sliders);  // Return the sliders in response
    } catch (err) {
        console.error('Error fetching sliders:', err);
        res.status(500).json({ message: 'Error fetching sliders', error: err.message });
    }
};


// Edit Slider
exports.editSlider = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'File upload failed', error: err.message });
        }

        const { title, description, price, discount } = req.body;
        const slider = await Slider.findById(req.params.id);

        if (!slider) {
            return res.status(404).json({ message: 'Slider not found' });
        }

        slider.title = title;
        slider.description = description;
        slider.price = price;
        slider.discount = discount;

        if (req.files && req.files.length > 0) {
            // Remove old images from filesystem if needed
            const oldImages = slider.image.split(',');
            oldImages.forEach(image => {
                const imagePath = path.join(__dirname, '../uploads', image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            });

            // Add new images
            const imageNames = req.files.map(file => file.filename);
            slider.image = imageNames.join(',');
        }

        try {
            await slider.save();
            res.status(200).json({ message: 'Slider updated successfully', slider });
        } catch (error) {
            res.status(500).json({ message: 'Error updating slider', error: error.message });
        }
    });
};

// Delete Slider
exports.deleteSlider = async (req, res) => {
    try {
        const slider = await Slider.findById(req.params.id);

        if (!slider) {
            return res.status(404).json({ message: 'Slider not found' });
        }

        const imagePaths = slider.image.split(',');
        imagePaths.forEach(image => {
            const imagePath = path.join(__dirname, '../uploads', image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        });

        await slider.deleteOne();
        res.status(200).json({ message: 'Slider deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting slider', error: err.message });
    }
};
