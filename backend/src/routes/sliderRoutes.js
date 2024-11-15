const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/sliderController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the directory for uploads
const uploadsDir = path.join(__dirname, '../public/product-images');

// Check if the uploads directory exists; if not, create it
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage with dynamic filename generation
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Set the upload directory
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname); // Create a unique name with timestamp
        cb(null, uniqueName);
    }
});

// Initialize multer for handling multiple images (up to 10)
const upload = multer({ storage: storage }).array('image', 10);  // Accept up to 10 images

// Route to add a new slider with uploaded images
router.post('/add', upload, sliderController.addSlider);

// Route to get all sliders (no filtering by swiper)
router.get('/all/slider', sliderController.getSliders);

// Route to edit a slider
router.put('/edit/:id', upload, sliderController.editSlider);

// Route to delete a slider
router.delete('/delete/:id', sliderController.deleteSlider);

module.exports = router;
