const mongoose = require('mongoose');
// Temporarily comment out bcryptjs
// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
        // Removed select: false to simplify
    },
    location: {
        type: String,
        default: 'Not specified'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Temporarily comment out password hashing
/*
// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
    try {
        // Only hash the password if it's modified (or new)
        if (!this.isModified('password')) {
            return next();
        }
        
        // Generate salt
        const salt = await bcrypt.genSalt(10);
        
        // Hash password
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error('Password hashing error:', error);
        next(error);
    }
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        console.error('Password comparison error:', error);
        throw new Error('Password verification failed');
    }
};
*/

// Simple password comparison for testing
userSchema.methods.matchPassword = function(enteredPassword) {
    return this.password === enteredPassword;
};

const User = mongoose.model('User', userSchema);

module.exports = User; 