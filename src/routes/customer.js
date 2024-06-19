// Import express
const express = require('express');

// import router
const router = express.Router();

// Route Controller
const CustomerController = require('../controllers/customer');

// Get List
router.get('/list', CustomerController.getCustomers);

// Get
router.get('/:key', CustomerController.getCustomer);

// Add
router.post('/add', CustomerController.addCustomer);

// Edit
router.put('/edit', CustomerController.editCustomer);

// Restore
router.post('/restore/:key', CustomerController.restoreCustomer);

// Soft Delete
router.delete('/delete/:key', CustomerController.deleteCustomer);

// Hard Delete
router.delete('/hard-delete/:key', CustomerController.hardDeleteCustomer);

// Export router
module.exports = router;
