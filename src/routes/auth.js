// Import express
const express = require('express');

// import router
const router = express.Router();

// Route Controller
const AuthController = require('../controllers/auth');

// Sign up
router.post('/signup', AuthController.signUp);

// Sign in
router.post('/signin', AuthController.signIn);

// Sign Out
router.post('/signout', AuthController.signOut);

// Who Am I 
router.post('/whoami', AuthController.whoAmI);

// Export router
module.exports = router;
