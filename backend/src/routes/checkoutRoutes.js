// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");
const { getCheckoutById } = require("../controllers/checkoutController");
router.post("/checkouts", checkoutController.createOrder);
router.get("/checkouts/getOrders", checkoutController.getOrders);
// Route to get a checkout by ID
router.get("/checkout/:orderId", getCheckoutById);
router.put('/checkouts/cancelOrders/:orderId', checkoutController.cancelOrder);
module.exports = router;



