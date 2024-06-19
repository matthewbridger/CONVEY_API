// Import express
const express = require('express');

// import router
const router = express.Router();

// Route Controller
const StatisticController = require('../controllers/statistic');

// Get
router.get('/table-count/:key', StatisticController.getTableCount);

router.get('/latest-updated-items/:key', StatisticController.getLatestUpdatedItems);

// Export router
module.exports = router;
