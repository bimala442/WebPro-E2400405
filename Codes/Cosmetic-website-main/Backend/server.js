const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

// Simple route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Server is running correctly' });
});

// Define port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MongoDB)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Test route: http://localhost:${PORT}/`);
}); 