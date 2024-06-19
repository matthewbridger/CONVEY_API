// Import express
const express = require('express');

// import router
const router = express.Router();

// Route Controller
const ProductVariationController = require('../controllers/productVariation');

// Get List
router.get('/list', ProductVariationController.getProductVariations);

// Get
router.get('/:key', ProductVariationController.getProductVariation);

// Add
router.post('/add', ProductVariationController.addProductVariation);

// Edit
router.put('/edit', ProductVariationController.editProductVariation);

// Restore
router.post('/restore/:key', ProductVariationController.restoreProductVariation);

// Soft Delete
router.delete('/delete/:key', ProductVariationController.deleteProductVariation);

// Hard Delete
router.delete('/hard-delete/:key', ProductVariationController.hardDeleteProductVariation);

// Export router
module.exports = router;
