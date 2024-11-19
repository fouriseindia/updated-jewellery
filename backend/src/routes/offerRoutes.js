const express = require('express');
const multer = require('multer');
const offerController = require('../controllers/addofferController');
const exofferController = require('../controllers/addExclDisController');

const router = express.Router();

// Configure multer storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Specify the destination directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Create a unique filename
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Routes for each tab
router.post('/exclusive-discount', exofferController.addExclusiveDiscount);

// Route for Discover Jewellery - allow multiple images
router.post(
    '/discover-jewellery',
    upload.array('images', 5), // Allow up to 5 images per product
    offerController.addDiscoverJewellery
);

// Route for Shop by Look - allow multiple images
router.post(
    '/shop-by-look',
    upload.array('images', 5), // Allow up to 5 images per product
    offerController.addShopByLook
);

// Route to get products by category
router.get('/:category', offerController.getProductsByCategory);

module.exports = router;
