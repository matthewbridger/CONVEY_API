// Import express
const express = require('express');

// import router
const router = express.Router();

// Route Controller
const UserController = require('../controllers/user');

// Get List
router.get('/list', UserController.getUsers);

// Get
router.get('/:key', UserController.getUser);

// Add
router.post('/add', UserController.addUser);

// Edit
router.put('/edit', UserController.editUser);

// Restore
router.post('/restore/:key', UserController.restoreUser);

// Soft Delete
router.delete('/delete/:key', UserController.deleteUser);

// Hard Delete
router.delete('/hard-delete/:key', UserController.hardDeleteUser);

// Export the router
module.exports = router;
