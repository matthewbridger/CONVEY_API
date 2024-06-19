// Import express
const express = require('express');

// import router
const router = express.Router();

// Route Controller
const ProductController = require('../controllers/product');

// Get List
router.get('/list', ProductController.getProducts);

// Get
router.get('/:key', ProductController.getProduct);

// Add
router.post('/add', ProductController.addProduct);

// Edit
router.put('/edit', ProductController.editProduct);

// Restore
router.post('/restore/:key', ProductController.restoreProduct);

// Soft Delete
router.delete('/delete/:key', ProductController.deleteProduct);

// Hard Delete
router.delete('/hard-delete/:key', ProductController.hardDeleteProduct);

// Export router
module.exports = router;
