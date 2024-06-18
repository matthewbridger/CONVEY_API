const Sequelize = require('sequelize');
const Database = require('../services/database/connect');
const Permission = require('./permission');
const bcrypt = require('bcrypt');

const User = Database.define('users', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    
    email: {
        type: Sequelize.STRING(320),
        allowNull: false,
    },

    firstName: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },

    lastName: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },

    password: {
        type: Sequelize.STRING(256),
        allowNull: false,
    },

    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

// Methods
User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

// Relationships
User.belongsTo(Permission, { foreignKey: 'permissionId', as: 'permission' });

module.exports = User;