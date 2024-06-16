const Sequelize = require('sequelize');
const Database = require('../services/database/connect');
const Product = require('./product');

const ProductVariation = Database.define('productVariation', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },

    amountOfStock: {
        type: Sequelize.INTEGER,
        default: 0,
    },

    price: {
        type: Sequelize.FLOAT,
        default: 0,
    },

    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

// Relationships
ProductVariation.belongsTo(Product, { 
    foreignKey: {
        name: 'productId',
        allowNull: false
    },
    as: 'product'
});

// Associations
Product.hasMany(ProductVariation, { as: 'productVariations' });

module.exports = ProductVariation;