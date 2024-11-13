const express = require('express');
const router = express.Router();
const { createOrder, getOrdersByCustomer, getOrderById, updateOrderStatus, deleteOrder,getOrderHistory} = require('../controllers/orderController');

// Create an order
router.post('/orders', createOrder);

// Get all orders for a specific customer
router.get('/orders/customer/:customerId', getOrdersByCustomer);

// Get a specific order by ID
router.get('/orders/:id', getOrderById);

// Update order status
router.put('/orders/:id/status', updateOrderStatus);

// Delete an order
router.delete('/orders/:id', deleteOrder);

//Order routes for order
router.get('/history/:customerId',getOrderHistory);
module.exports = router;
