// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    email: { type: String,},
    phone: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    address2: { type: String },
    addresstype: { type: String },
    locality: { type: String },
    city: { type: String },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    product: { type: String, required: true },
    price:{type:Number,required:true},
    quantity: { type: Number, required: true },
    status:{type:String,default:'confirmed'},

    orderTotal: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Checkout", orderSchema);
