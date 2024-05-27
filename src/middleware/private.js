require('dotenv').config();
const User = require('../models/user')
const Session = require('../models/session')

module.exports = async (req, res, next) => {
    try {
        const sessionId = req.cookies.sessionId || req.header("X-Session-Id");

        if(!sessionId) {
            throw new Error('session id required');
        }

        const currentSession = await Session.findByPk(sessionId);

        if(!currentSession) {
            throw new Error('no session found');
        }
        
        const currentTime = new Date();
        
        if(currentTime >= currentSession.expiresAt) {
            await currentSession.destroy();
            throw new Error('session expired');
        }

        currentSession.expiresAt = new Date(currentTime.getTime() + Number(process.env.COOKIE_SESSION_EXPIRY_TIME_MS))

        await currentSession.save();

        const user = await User.findByPk(currentSession.userId);

        req.session = sessionId;
        req.user = user;

        next();
    }
    catch(error) {
        res.status(401);
        res.send({ error: 'failed to validate session' })
    }
};