const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    image: { type: String, required: true }, // Stores image filename
    swiper: { type: String, required: true } // swiper1, swiper2, or swiper3
});

module.exports = mongoose.model('Slider', sliderSchema);
