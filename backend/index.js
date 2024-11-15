const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Import route files

const categoryRoutes = require('./src/routes/categoryRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const productRoutes = require('./src/routes/productRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const OtpRoutes = require ('./src/routes/OtpRoutes');
const userRoutes = require('./src/routes/userRoutes');
const sliderRoutes = require ('./src/routes/sliderRoutes');
const CheckoutRoutes=require('./src/routes/checkoutRoutes')
const offerRoutes = require('./src/routes/offerRoutes');
const exclusiveRoute = require('./src/routes/exclusiveRoute');
const ImageRoutes = require('./src/routes/uploadRoutes');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware setup
app.use(cors()); 
app.use(express.json()); // Middleware to parse incoming JSON requests

// Middleware for handling images (if needed)
// const imageMiddleware = (req, res, next) => {
//     console.log('Image middleware invoked');
//     next();
// };

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('src/uploads'));
// app.use(imageMiddleware); // Use image middleware
// app.use(express.json());
// app.use('/public', express.static(path.join(__dirname, 'public')));
// Set view engine for rendering category pages
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');  // Prevents caching of API responses
    next();
});

// Define routes

app.use('/api/categories', categoryRoutes); // Category routes
app.use('/api', messageRoutes); // Message routes
app.use('/api/products', productRoutes); // Product routes
app.use('/admin', adminRoutes); // Admin routes
app.use('/api', orderRoutes); // Order routes
app.use('/api', profileRoutes); // Profile routes
app.use('/api/otp', OtpRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sliders', sliderRoutes);
app.use("/api", CheckoutRoutes);

app.use('/api/offers', offerRoutes);
app.use('/api/exdiscount', exclusiveRoute);
app.use('/', ImageRoutes);

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
