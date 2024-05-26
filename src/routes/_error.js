// Import express
const express = require('express');

// import router
const router = express.Router();

// Route middleware
// ** PAGE NOT FOUND
router.use((req, res, next) => {
    res.status(404);
    res.send('Page not found...');
});

// export router
module.exports = router;