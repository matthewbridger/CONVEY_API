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

// Import cookie parser to handle cookies
const cookieParser = require('cookie-parser');

// Import middleware
const publicMiddleware = require('./middleware/public');
const privateMiddleware = require('./middleware/private');

// Import Routes
const productRoutes = require('./routes/product');
const productVariationRoutes = require('./routes/productVariation');
const statisticRoutes = require('./routes/statistic');
const customerRoutes = require('./routes/customer');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const errorRoutes = require('./routes/_error');

// Serialize buffer middleware
app.use(bodyParser.urlencoded( { extended: true } ));

// Enable the use of JSON
app.use(bodyParser.json());

// Enable cookie parser
app.use(cookieParser());

// Express router config
app.use(router);

// Add public routes
app.use('/api/v1/authentication', publicMiddleware, authRoutes);

// Add private routes
app.use('/api/v1/customer', privateMiddleware, customerRoutes);
app.use('/api/v1/product', privateMiddleware, productRoutes);
app.use('/api/v1/product-variation', privateMiddleware, productVariationRoutes);
app.use('/api/v1/statistic', privateMiddleware, statisticRoutes);
app.use('/api/v1/user', privateMiddleware, userRoutes);

// Error handling
app.use(errorRoutes);

// Init Tables
require('./models/user');
require('./models/permission');
require('./models/session');
require('./models/productVariation');
require('./models/product');
require('./models/customer');

// Launch API
Database.sync({ force: false })
    .then(() => {
        app.listen(process.env.LAUNCH_PORT, () => {
            Log.console('server', `is running on port ${process.env.LAUNCH_PORT}`);
        });
    });