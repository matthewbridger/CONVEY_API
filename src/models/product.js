const Sequelize = require('sequelize');
const Database = require('../services/database/connect');

const Product = Database.define('products', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    colour: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    size: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Product;