

const Category = require('../models/categoryModel');// Ensure you import the Subcategory model
const Product = require('../models/productModel');  // Assuming you have a Product model
// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const { mainCategory } = req.query; // Accept mainCategory as a query parameter
    const query = mainCategory ? { mainCategory } : {}; // If mainCategory is provided, filter by it

    const categories = await Category.find(query).sort({ createdAt: 1 });
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new category
// exports.addCategory = async (req, res) => {
//   const { name, mainCategory } = req.body;

//   // Validate input
//   if (!name) {
//     return res.status(400).json({ message: 'Name is required' });
//   }

//   try {
//     const newCategory = new Category({ name, mainCategory });
//     await newCategory.save();
//     res.status(201).json(newCategory);
//   } catch (error) {
//     console.error('Error adding category:', error);
//     res.status(400).json({ message: 'Error adding category' });
//   }
// };
exports.addCategory = async (req, res) => {
  const { name, mainCategory, subcategories } = req.body; // Include subcategories in the request

  // Validate input
  if (!name || !mainCategory) {
      return res.status(400).json({ message: 'Name and main category are required' });
  }

  try {
      const newCategory = new Category({ name, mainCategory, subcategories });
      await newCategory.save();
      res.status(201).json(newCategory);
  } catch (error) {
      console.error('Error adding category:', error);
      res.status(400).json({ message: 'Error adding category' });
  }
};


// Update category
exports.updateCategory = async (req, res) => {
  const { name, mainCategory } = req.body;

  // Validate input
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, mainCategory },
      { new: true, runValidators: true } // Ensure validators are run
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({ message: 'Error updating category' });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(400).json({ message: 'Error deleting category' });
  }
};

// Get category by ID and render its page
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.render('categoryPage', { category });
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get subcategories by category ID
exports.getSubcategoriesByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.id; // Get the category ID from the request parameters
    const subcategories = await Subcategory.find({ category: categoryId }); // Fetch subcategories for the given category ID

    if (!subcategories.length) {
      return res.status(404).json({ message: 'No subcategories found for this category.' });
    }

    res.status(200).json(subcategories); // Return the found subcategories
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ message: 'Failed to fetch subcategories', error: error.message });
  }
};

// Get category by main category and subcategory
exports.getCategoryByMainAndSubcategory = async (req, res) => {
  try {
    const { mainCategory, subcategory } = req.params; // Extract from URL params

    // Find category based on mainCategory and check if subcategory exists in the subcategories array
    const category = await Category.findOne({
      mainCategory: mainCategory,
      subcategories: { $in: [subcategory] }, // Check if subcategory is within the subcategories array
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Fetch products related to this category and subcategory
    const products = await Product.find({
      mainCategory: category._id, // Assuming Product has a reference to Category
      subcategory: { $in: [subcategory] }, // Filter products by subcategory
    });

    // Return the products related to the found category
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching category by main category and subcategory:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to fetch products based on categoryName and mainCategory
exports.getProductsByCategoryNameAndMainCategory = async (req, res) => {
  try {
      const { categoryName, mainCategory } = req.query;

      if (!categoryName || !mainCategory) {
          return res.status(400).json({ error: 'Category name and main category are required' });
      }

      console.log('Searching for category with name:', categoryName, 'and mainCategory:', mainCategory);

      // Find category
      const category = await Category.findOne({ name: categoryName, mainCategory: mainCategory });
      console.log('Found category:', category);

      if (!category) {
          return res.status(404).json({ message: 'Category not found' });
      }

      // Fetch products
      const products = await Product.find({
          $or: [
              { category: category._id },
              { category: null }
          ]
      });

      console.log('Found products:', products);

      if (products.length === 0) {
          return res.status(404).json({ message: 'No products found for this category and main category' });
      }

      return res.status(200).json(products);
  } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ error: 'Server error, please try again later' });
  }
};
