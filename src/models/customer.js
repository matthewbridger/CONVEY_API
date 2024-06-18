const Sequelize = require('sequelize');
const Database = require('../services/database/connect');

const Customer = Database.define('customers', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    contactEmail: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    contactNumber: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Customer;