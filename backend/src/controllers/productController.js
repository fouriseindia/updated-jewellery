
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const mongoose = require('mongoose');

// Add product
const createProduct = async (req, res) => {
    try {
        const { productTitle, productPrice, regularPrice, productDescription, category, subcategory, shippingDetails } = req.body;

        // Fetch the category ObjectId
        const categoryDoc = await Category.findOne({ mainCategory: category });
        if (!categoryDoc) {
            return res.status(400).json({ message: 'Category not found' });
        }

        // Fetch the subcategory ObjectId
        const subcategoryDoc = await Category.findById(subcategory);
        if (!subcategoryDoc) {
            return res.status(400).json({ message: 'Subcategory not found' });
        }

        // Create new product
        const newProduct = new Product({
            productTitle,
            productPrice,
            regularPrice,
            productDescription,
            category: categoryDoc._id,
            subcategory: subcategoryDoc._id,
            shippingDetails,
        });

        // Handle file uploads
        if (req.files) {
            if (req.files.mainImage) {
                newProduct.mainImage = req.files.mainImage[0].path; // Save the main image path
            }
            if (req.files.thumbnails) {
                newProduct.thumbnailImages = req.files.thumbnails.map(file => file.path); // Save thumbnail images paths
            }
            if (req.files.productVideo) {
                newProduct.productVideo = req.files.productVideo[0].path; // Save the product video path
            }
        }

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { productTitle, productDescription, productPrice, category, subcategory, shippingDetails } = req.body;

        // Validate category and subcategory
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(400).json({ message: 'Invalid category ID.' });
        }

        const existingSubcategory = await Category.findById(subcategory);
        if (!existingSubcategory) {
            return res.status(400).json({ message: 'Invalid subcategory ID.' });
        }

        // Prepare update data
        const updateData = {
            productTitle,
            productDescription,
            productPrice,
            category,
            subcategory,
            shippingDetails,
        };

        // Handle file updates
        if (req.files) {
            if (req.files.mainImage) {
                updateData.mainImage = req.files.mainImage[0].path; // Update main image path
            }
            if (req.files.thumbnails) {
                updateData.thumbnailImages = req.files.thumbnails.map(file => file.path); // Update thumbnail images paths
            }
            if (req.files.productVideo) {
                updateData.productVideo = req.files.productVideo[0].path; // Update product video path
            }
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product', error });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category subcategory');
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products', error });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }

        const product = await Product.findById(id).populate('category subcategory');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Failed to fetch product', error });
    }
};
// Delete product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product', error });
    }
};

// const getProductsByCategoryName = async (req, res) => {
//     try {
//         const categoryName = req.params.name;  // Get category name from URL, e.g., "Ring"

//         // Find the category document with the given name
//         const category = await Category.findOne({ name: categoryName });
//         if (!category) {
//             return res.status(404).json({ message: 'Category not found' });
//         }

//         // Find products that belong to this category
//         const products = await Product.find({ category: category._id }).populate('category subcategory');
        
//         res.status(200).json(products);
//     } catch (error) {
//         console.error('Error fetching products by category:', error);
//         res.status(500).json({ message: 'Failed to fetch products', error: error.message });
//     }
// };
const getProductsByCategoryName = async (req, res) => {
    try {
        const subcategoryName = req.params.name;  // Get category name from URL, e.g., "Ring"

        // Find the category document with the given name
        const category = await Category.findOne({ name: subcategoryName });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Find products that belong to this category
        const products = await Product.find({ subcategory: category._id }).populate('category subcategory');
        
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCategoryName,
};
