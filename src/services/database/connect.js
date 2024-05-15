require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        port: process.env.DATABASE_PORT,
        logging: process.env.DATABASE_ENABLE_LOGGING == 1 ? true : false,
        dialectOptions: {
            options: {
                encrypt: false,
            }
        }
    }
);

module.exports = sequelize;