const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { customer, items, address } = req.body;
        
        let totalAmount = 0;
        for (let item of items) {
            const product = await Product.findById(item.product);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            totalAmount += product.price * item.quantity;
        }

        const newOrder = new Order({
            customer,
            items,
            totalAmount,
            address
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};

// Get all orders for a user
exports.getOrdersByCustomer = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.params.customerId }).populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};

// Get a single order
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.product');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order', error: error.message });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete order', error: error.message });
    }
};

exports.getOrderHistory = async (req, res) => {
    try {
        const customerId = req.params.customerId; // Get customer ID from request parameters

        // Fetch orders for the customer and populate items with product details
        const orders = await Order.find({ customer: customerId })
                                  .populate('items.product')
                                  .sort({ createdAt: -1 }); // Sort by latest first

        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ message: 'Failed to fetch order history', error: error.message });
    }
};