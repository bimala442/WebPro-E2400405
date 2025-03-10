// A completely standalone Express server
// This has no dependencies on any other files in your project
// Run this with: node standalone.js

// The only dependency is Express itself
const express = require('express');

// Initialize express app
const app = express();

// Use JSON middleware
app.use(express.json());

// Enable CORS manually
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Simple routes for testing

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Standalone server is running!',
        endpoints: [
            { path: '/', method: 'GET', description: 'This info page' },
            { path: '/api/test', method: 'GET', description: 'Test API endpoint' },
            { path: '/api/echo', method: 'POST', description: 'Echo back request body' }
        ],
        timestamp: new Date().toISOString()
    });
});

// Test API route
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'API test endpoint is working',
        time: new Date().toISOString()
    });
});

// Echo API route
app.post('/api/echo', (req, res) => {
    res.json({
        success: true,
        message: 'Echo endpoint',
        receivedData: req.body,
        timestamp: new Date().toISOString()
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`
    });
});

// Define port
const PORT = 5000;

// Start server
app.listen(PORT, () => {
    console.log('====================================');
    console.log(`Standalone server running on port ${PORT}`);
    console.log(`Try accessing: http://localhost:${PORT}/`);
    console.log('This server has NO dependencies on other files');
    console.log('====================================');
}); 