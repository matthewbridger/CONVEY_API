module.exports = async (req, res, next) => {
    try {
        req.session = req.cookies.sessionId || req.header("X-Session-Id");

        next();
    }
    catch(error) {
        res.status(401);
        res.send({ error: 'failed to validate session' })
    }
};