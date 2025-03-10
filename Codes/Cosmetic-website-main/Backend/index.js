const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());

// Define port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MongoDB)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        // Don't exit the process, let it continue even if DB connection fails initially
    });

// Define routes
app.get('/', (req, res) => {
    res.send('Backend server is running');
});

// Import and use route files
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const siteInfoRoutes = require('./routes/siteInfoRoutes');
const orderRoutes = require('./routes/orderRoutes');

// API routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/site-info', siteInfoRoutes);
app.use('/api/orders', orderRoutes);

// Handle 404 - Route not found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: `Route not found: ${req.originalUrl}`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        error: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 