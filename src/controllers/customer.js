const Customer = require('../models/customer');

// Get a list of customers
exports.getCustomers = async (req, res, next) => {
    try {
        // Execute SQL
        const dbResponse = await Customer.findAll();

        // Return result
        res.send(dbResponse);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Get Customer
exports.getCustomer = async (req, res, next) => {
    try {
        // Execute SQL
        const dbResponse = await Customer.findByPk(req.params.key);

        // Return result
        res.send(dbResponse);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Add Customer
exports.addCustomer = async (req, res, next) => {
    try {
        // Clone request body to a user object
        const user = { ...req.body };

        // Create row in database
        const dbResponse = await Customer.create(user);

        // Return result
        res.status(201);
        res.send(dbResponse.dataValues);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

//Edit Customer
exports.editCustomer = async (req, res, next) => {
    try {
        // New Customer
        const newCustomer = { ...req.body };

        // Existing Customer
        let currCustomer = await Customer.findByPk(newCustomer.id);

        // Customer
        currCustomer.name = newCustomer.name;
        currCustomer.contactEmail = newCustomer.contactEmail;
        currCustomer.contactNumber = newCustomer.contactNumber;

        // Update row in database
        await currCustomer.save();

        // Return result
        res.status(200);
        res.send(currCustomer);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Restore Customer using param key
exports.restoreCustomer = async (req, res, next) => {
    try {
        let currentCustomer = await Customer.findByPk(req.params.key);
        
        currentCustomer.isDeleted = false;

        await currentCustomer.save();

        res.status(200);
        res.send(currentCustomer);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Soft delete Customer using param key
exports.deleteCustomer = async (req, res, next) => {
    try {
        let currentCustomer = await Customer.findByPk(req.params.key);
        
        currentCustomer.isDeleted = true;

        await currentCustomer.save();

        res.status(200);
        res.send(currentCustomer);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Hard delete Customer using param key
exports.hardDeleteCustomer = async (req, res, next) => {
    try {
        const currentCustomer = await Customer.findByPk(req.params.key);

        await currentCustomer.destroy();
        
        res.send({ success: true });
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};
