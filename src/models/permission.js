const Sequelize = require('sequelize');
const Database = require('../services/database/connect');

const Permission = Database.define('permissions', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    
    alias: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },

    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Permission;