const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Ensure this path is correct
const upload = require('../middlewares/imageMiddleware'); 

const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = productController;

// Add a new product with image and video uploads
router.post('/add', 
    upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'thumbnails', maxCount: 4 }, { name: 'productVideo', maxCount: 1 }]),
    (req, res) => {
        // Check for unexpected fields
        const unexpectedFields = Object.keys(req.files).filter(field => !['mainImage', 'thumbnails', 'productVideo'].includes(field));
        if (unexpectedFields.length > 0) {
            return res.status(400).json({ error: 'Unexpected fields: ' + unexpectedFields.join(', ') });
        }

        // Your handling logic
        productController.createProduct(req, res);
    }
);

// Edit an existing product with image and video uploads
router.put('/edit/:id', 
    upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'thumbnails', maxCount: 4 }, { name: 'productVideo', maxCount: 1 }]), // Upload images when editing
    updateProduct
);

// Get all products
router.get('/all', getProducts);

// Get a single product by ID
router.get('/:id', getProductById);

// Delete a product by ID
router.delete('/delete/:id', deleteProduct);

module.exports = router;
