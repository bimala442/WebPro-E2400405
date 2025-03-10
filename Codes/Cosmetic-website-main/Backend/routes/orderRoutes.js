const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/', orderController.createOrder);

// Get all orders (admin only)
router.get('/', orderController.getOrders);

// Get order by ID
router.get('/:id', orderController.getOrderById);

// Get orders by email
router.get('/email/:email', orderController.getOrdersByEmail);

// Update order status (admin only)
router.put('/:id', orderController.updateOrderStatus);

module.exports = router; 