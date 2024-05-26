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

// Edit User
exports.editUser = async (req, res, next) => {
    try {
        // New User
        const newUser = { ...req.body };

        // Existing User
        let currUser = await User.findByPk(newUser.id);

        // User
        currUser.firstName = newUser.firstName;
        currUser.lastName = newUser.lastName;
        currUser.email = newUser.email;

        // Update row in database
        await currUser.save();

        // Return result
        res.status(200);
        res.send(currUser);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Restore User using param key
exports.restoreUser = async (req, res, next) => {
    try {
        let currentUser = await User.findByPk(req.params.key);
        
        currentUser.isDeleted = false;

        await currentUser.save();

        res.status(200);
        res.send(currentUser);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Soft delete User using param key
exports.deleteUser = async (req, res, next) => {
    try {
        let currentUser = await User.findByPk(req.params.key);
        
        currentUser.isDeleted = true;

        await currentUser.save();

        res.status(200);
        res.send(currentUser);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Hard delete User using param key
exports.hardDeleteUser = async (req, res, next) => {
    try {
        const currentUser = await User.findByPk(req.params.key);

        await currentUser.destroy();
        
        res.send({ success: true });
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};
