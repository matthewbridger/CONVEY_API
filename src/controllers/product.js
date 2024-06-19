const Product = require('../models/product');
const ProductVariation = require('../models/productVariation');

// Get a list of products
exports.getProducts = async (req, res, next) => {
    try {
        // Execute SQL
        const dbResponse = await Product.findAll({
            include: [{
                model: ProductVariation,
                as: 'productVariations',
                attributes: {
                    exclude: [ 'productId', 'productColourId', 'productSizeId'],
                }
            }]
        });

        // Return result
        res.send(dbResponse);
    }
    catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};

// Get product
exports.getProduct = async (req, res, next) => {
    try {
        // Execute SQL
        const dbResponse = await Product.findByPk(req.params.key, {
            include: [{
                model: ProductVariation,
                as: 'productVariations',
                attributes: {
                    exclude: [ 'productId', 'productColourId', 'productSizeId'],
                }
            }]
        });

        // Return result
        res.send(dbResponse);
    }
    catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};

// Add product
exports.addProduct = async (req, res, next) => {
    try {
        // Clone request body to a product object
        const product = { ...req.body };

        // Create row in database
        const dbResponse = await Product.create(product);

        // Return result
        res.status(201);
        res.send(dbResponse.dataValues);
    }
    catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};

// Edit product
exports.editProduct = async (req, res, next) => {
    try {
        // New Product
        const newProduct = { ...req.body };

        // Existing Product
        let currProduct = await Product.findByPk(newProduct.id);

        // Product
        currProduct.title = newProduct.title;

        // Update row in database
        await currProduct.save();

        // Return result
        res.status(200);
        res.send(currProduct);
    }
    catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};

// Restore Product using param key
exports.restoreProduct = async (req, res, next) => {
    try {
        let currentProduct = await Product.findByPk(req.params.key);
        
        currentProduct.isDeleted = false;

        await currentProduct.save();

        res.status(200);
        res.send(currentProduct);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Soft delete Product using param key
exports.deleteProduct = async (req, res, next) => {
    try {
        let currentProduct = await Product.findByPk(req.params.key);
        
        currentProduct.isDeleted = true;

        await currentProduct.save();

        res.status(200);
        res.send(currentProduct);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// Hard delete Product using param key
exports.hardDeleteProduct = async (req, res, next) => {
    try {
        const currentProduct = await Product.findByPk(req.params.key);

        await currentProduct.destroy();
        
        res.send({ success: true });
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};
