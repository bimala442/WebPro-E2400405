const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// Get all products and create a new product
router
    .route('/')
    .get(getAllProducts)
    .post(createProduct);

// Get, update, and delete a product by ID
router
    .route('/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router; 