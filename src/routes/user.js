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

// Export the router
module.exports = router;
