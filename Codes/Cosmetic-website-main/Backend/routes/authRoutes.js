const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Register and login routes
router.post('/register', register);
router.post('/login', login);

// Protected route for getting user profile
router.get('/me', protect, getMe);

module.exports = router; 