const Database = require('../services/database/connect');

// TODO - Get a list of products
exports.getTableCount = async (req, res, next) => {
    try {
        total = 0;
        res.send({ total: count });
    }
    catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};

//TODO - Get the latest items updated
exports.getLatestUpdatedItems = async (req, res) => {
    try {
        const rows = [];
        res.send(rows);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
