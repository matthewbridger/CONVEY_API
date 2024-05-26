// Import global .env config variables
require('dotenv').config();

// Import Customer Logger
const Log = require('./services/debug/log');

// Import Sequelize
const Database = require('./services/database/connect');

// Import express js
const express = require('express');
const bodyParser = require('body-parser');

// Init express js
const app = express();

// Import Cors
const router = require('./services/router');

// Import Routes
const userRoutes = require('./routes/user');
const errorRoutes = require('./routes/_error');

// Serialize buffer middleware
app.use(bodyParser.urlencoded( { extended: true } ));

// Enable the use of JSON
app.use(bodyParser.json());

// Express router config
app.use(router);

// Use routes
app.use('/api/v1/user', userRoutes);

// Error handling
app.use(errorRoutes);

require('./models/user');

// Launch API
Database.sync({ force: true })
    .then(() => {
        app.listen(process.env.LAUNCH_PORT, () => {
            Log.console('server', `is running on port ${process.env.LAUNCH_PORT}`);
        });
    });