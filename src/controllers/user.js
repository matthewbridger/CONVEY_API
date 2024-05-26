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