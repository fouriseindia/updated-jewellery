// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");

router.post("/checkouts", checkoutController.createOrder);
router.get("/checkouts/getOrders", checkoutController.getOrders);
router.put('/checkouts/cancelOrders/:orderId', checkoutController.cancelOrder);
module.exports = router;


//localhost:3000/api/checkouts/cancelOrders/:id