// src/routes/api.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API Home');
});

router.get('/example', (req, res) => {
  res.json({ message: 'This is an example route' });
});

module.exports = router;
