// routes/offerRoutes.js
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
router.post('/discover-jewellery', upload.single('image'), offerController.addDiscoverJewellery);
router.post('/shop-by-look', upload.single('image'), offerController.addShopByLook);

// Route to get products by category
router.get('/:category', offerController.getProductsByCategory);

module.exports = router;
