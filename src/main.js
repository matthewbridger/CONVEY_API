// src/index.js
require('dotenv').config();
const Database = require('./services/database/connect');

const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Launch API
Database.sync({ force: true })
    .then(() => {
        app.listen(process.env.LAUNCH_PORT, () => {
            console.log('server', `is running on port ${process.env.LAUNCH_PORT}`);
        });
    });