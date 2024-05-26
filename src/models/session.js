const Sequelize = require('sequelize');
const Database = require('../services/database/connect');
const User = require('./user');
const FormatDate = require('../services/format/date');

const Session = Database.define('session', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
    },
    
    expiresAt: {
        type: Sequelize.DATE(6),
        allowNull: false,
        get: FormatDate.get('expiresAt'),
        set: FormatDate.set('expiresAt'),
    },

    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

// Relationships
Session.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Session;