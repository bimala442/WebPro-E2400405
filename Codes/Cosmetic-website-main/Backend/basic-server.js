// A very simple Express server without dependencies
const express = require('express');

// Initialize express app
const app = express();

// Use JSON middleware
app.use(express.json());

// Simple route for testing
app.get('/', (req, res) => {
    res.json({
        message: 'Server is running correctly',
        timestamp: new Date().toISOString()
    });
});

// Add a test route
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'API is working properly'
    });
});

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Basic test server started on port ${PORT}`);
    console.log(`Try accessing: http://localhost:${PORT}/`);
}); 