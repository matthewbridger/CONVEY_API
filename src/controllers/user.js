const User = require('../models/user');

// Get a list of Users
exports.getUsers = async (req, res, next) => {
    try {
        // Execute SQL
        const dbResponse = await User.findAll();

        // Return result
        res.send(dbResponse);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Get User
exports.getUser = async (req, res, next) => {
    try {
        // Execute SQL
        const dbResponse = await User.findByPk(req.params.key);

        // Return result
        res.send(dbResponse);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Add User
exports.addUser = async (req, res, next) => {
    try {
        // Clone request body to a user object
        const user = { ...req.body };

        // Create row in database
        const dbResponse = await User.create(user);

        // Return result
        res.status(201);
        res.send(dbResponse.dataValues);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};