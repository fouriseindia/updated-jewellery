// routes/offerRoutes.js
const express = require('express');

const exofferController = require('../controllers/addExclDisController');
const { editOffer, deleteOffer } = require('../controllers/addExclDisController'); // Importing the controller
const router = express.Router();

// Route to get products by category
router.get('/:category', exofferController.getProductsByCategory);

// Edit an offer
router.put('/:id', editOffer); // Use the editOffer controller
// Delete an offer
router.delete('/:id', deleteOffer); // Use the deleteOffer controller
module.exports = router;
