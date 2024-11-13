const Order = require("../models/checkoutModel");

// Controller to create a new order
exports.createOrder = async (req, res) => {
    console.log(req.body); // For debugging the incoming request body
    try {
        // Extract data from the request body
        const {
            email, phone, firstName, lastName, address, address2, addresstype,
            locality, city, state, zip, productname, productquantity, productprice
        } = req.body;

        // Calculate the order total for the product (price * quantity)
        const orderTotal = productprice * productquantity;

        // Create a new order
        const order = new Order({
            email,
            phone,
            firstName,
            lastName,
            address,
            address2,
            addresstype,
            locality,
            city,
            state,
            zip,
            product: productname,
            price: productprice,
            quantity: productquantity,
            orderTotal
        });

        // Save the order
        const savedOrder = await order.save();

        // Return a response with the saved order
        res.status(201).json({ message: "Order placed successfully", savedOrder });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ message: "Error saving order", error });
    }
};

// Controller to get all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving orders", error });
    }
};
exports.cancelOrder = async (req, res) => {
    const { orderId } = req.params; // Get the order ID from the URL parameters
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status: 'cancelled' }, // Update the status to 'cancelled'
        { new: true } // Return the updated document
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' }); // Handle case where order does not exist
      }
  
      res.status(200).json(updatedOrder); // Return the updated order
    } catch (err) {
      console.error('Error canceling order:', err.message); // Log error details
      res.status(500).json({ message: err.message }); // Respond with the error message
    }
  };
