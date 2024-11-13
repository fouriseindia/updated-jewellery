const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/sliderController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const uploadsDir = path.join(__dirname, '../uploads');

// Check if the uploads directory exists; if not, create it
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).array('image', 10);  // Accept up to 10 images

// Route to add a new slider
router.post('/add', upload, sliderController.addSlider);

// Route to get all sliders (no filtering by swiper)
router.get('/all/slider', sliderController.getSliders);

// Route to edit a slider
router.put('/edit/:id', upload, sliderController.editSlider);

// Route to delete a slider
router.delete('/delete/:id', sliderController.deleteSlider);

module.exports = router;
