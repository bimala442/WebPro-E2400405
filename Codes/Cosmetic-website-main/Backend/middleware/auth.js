// const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    try {
        // Check if token exists in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } 

        // Make sure token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to access this route'
            });
        }

        try {
            // Simple token verification (for testing only)
            // Decode base64 token
            const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
            
            // Simple validation
            if (!decoded.id) {
                throw new Error('Invalid token format');
            }

            // Set user in request
            const user = await User.findById(decoded.id);
            
            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: 'User no longer exists'
                });
            }
            
            req.user = user;
            next();
        } catch (error) {
            console.error('Token verification error:', error.message);
            return res.status(401).json({
                success: false,
                error: 'Invalid token'
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Server error in authentication'
        });
    }
}; 