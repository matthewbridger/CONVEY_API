const ProductVariation = require('../models/productVariation');

// Get a list of product variations
exports.getProductVariations = async (req, res, next) => {
    try {
        const dbResponse = await ProductVariation.findAll();

        res.send(dbResponse);
    }
    catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};

// Get product variation
exports.getProductVariation = async (req, res, next) => {
    try {
        const dbResponse = await ProductVariation.findByPk(req.params.key);

        res.send(dbResponse);
    }
    catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};

// Add product
exports.addProductVariation = async (req, res, next) => {
    try {
        // Clone request body to a product object
        const productVariation = { ...req.body };

        // Create row in database
        const dbResponse = await ProductVariation.create(productVariation);

        // Return result
        res.status(201);
        res.send(dbResponse.dataValues);
    }
    catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};

// Edit product variation
exports.editProductVariation = async (req, res, next) => {
    try {
        // New Product
        const newProductVariation = { ...req.body };

        // Existing Product
        let currProductVariation = await ProductVariation.findByPk(newProductVariation.id);

        // Product
        currProductVariation.alias = newProductVariation.alias;
        currProductVariation.productId = newProductVariation.productId;
        currProductVariation.sizeId = newProductVariation.sizeId;
        currProductVariation.amountOfStock = newProductVariation.amountOfStock;
        currProductVariation.price = newProductVariation.price;

        // Update row in database
        await currProductVariation.save();

        // Return result
        res.status(200);
        res.send(currProductVariation);
    }
    catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};

// Restore product variation using param key
exports.restoreProductVariation = async (req, res, next) => {
    try {
        let currentProductVariation = await ProductVariation.findByPk(req.params.key);
        
        currentProductVariation.isDeleted = false;

        await currentProductVariation.save();

        res.status(200);
        res.send(currentProductVariation);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Soft delete product variation using param key
exports.deleteProductVariation = async (req, res, next) => {
    try {
        let currentProductVariation = await ProductVariation.findByPk(req.params.key);
        
        currentProductVariation.isDeleted = true;

        await currentProductVariation.save();

        res.status(200);
        res.send(currentProductVariation);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Hard delete product variation using param key
exports.hardDeleteProductVariation = async (req, res, next) => {
    try {
        const currentProductVariation = await ProductVariation.findByPk(req.params.key);

        await currentProductVariation.destroy();
        
        res.send({ success: true });
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};
