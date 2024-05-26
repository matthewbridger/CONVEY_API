const Sequelize = require('sequelize');
const Database = require('../services/database/connect');
const bcrypt = require('bcryptjs');

const User = Database.define('user', {
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

module.exports = User;