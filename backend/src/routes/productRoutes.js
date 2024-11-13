

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/imageMiddleware');

const { createProduct, getProducts, getProductById, updateProduct, deleteProduct, getProductsByCategoryName } = productController;

// Add new product (with images and video)
router.post('/add', 
    upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'thumbnails', maxCount: 4 }, { name: 'productVideo', maxCount: 1 }]), 
    (req, res) => {
        console.log('Files received:', req.files); // Debugging to see if files are being received correctly
        createProduct(req, res);
    }
);

// Update product
router.put('/edit/:id', 
    upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'thumbnails', maxCount: 4 }, { name: 'productVideo', maxCount: 1 }]), 
    updateProduct
);

// Get all products
router.get('/all', getProducts);

// Get product by ID
router.get('/:id', getProductById);

// Delete product
router.delete('/delete/:id', deleteProduct);
router.get('/category/:name', getProductsByCategoryName);
module.exports = router;
