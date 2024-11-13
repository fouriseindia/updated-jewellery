const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Existing routes
router.get('/', categoryController.getCategories);
router.post('/', categoryController.addCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);
router.get('/:id', categoryController.getCategoryById)
// New route for fetching subcategories by category ID
router.get('/:id/subcategories', categoryController.getSubcategoriesByCategoryId);
router.get('/category/:mainCategory/:subcategory', categoryController.getCategoryByMainAndSubcategory);
router.get('/products', categoryController.getProductsByCategoryNameAndMainCategory);
module.exports = router;
