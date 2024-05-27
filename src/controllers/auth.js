require('dotenv').config();
const User = require('../models/user');
const Session = require('../models/session');
const Permission = require('../models/permission');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// SIGN UP USER
exports.signUp = async (req, res, next) => {
    try {
        // Create User
        const databaseUser = await User.create({ ...req.body });

        // Create token
        const token = crypto.randomBytes(12).toString("hex");

        // Set the time the session expires
        const expiresAt = new Date(Date.now() + Number(process.env.COOKIE_SESSION_EXPIRY_TIME_MS));

        // Create session
        const session = {
            id: token,
            expiresAt,
            userId: databaseUser.id,
        };

        // Create session in database
        const sessionResponse = await Session.create(session);

        // Throw if session doesn't get created
        if (!sessionResponse) {
            throw new Error("failed to create session");
        }

        // Pack a cookie for the response
        res.cookie("sessionId", token, {
            maxAge: Number(process.env.COOKIE_SESSION_EXPIRY_TIME_MS)
        })

        // Return result
        res.status(200);
        res.send(databaseUser);
    }
    catch (error) {
        console.log(error)

        res.status(400);
        res.send({ error: error.message });
    }
};

// SIGN IN USER
exports.signIn = async (req, res, next) => {
    try {
        // Clone request body to a user object
        const requestUser = { ...req.body };

        // Throw if no email in body
        if (!requestUser.email) {
            throw new Error("email address required");
        }

        // Throw if no password in body
        if (!requestUser.password) {
            throw new Error("password required");
        }

        // Get the user from database using email
        const databaseUser = await User.findOne({
            where: {
                email: requestUser.email,
            },
            include: [
                {
                    model: Permission,
                    as: 'permission',
                },
            ],
            attributes: { exclude: ['permissionId',] },
        });

        if(databaseUser?.permission?.alias) {
            databaseUser.permission = databaseUser.permission.alias;
        }


        // Throw if no user found in database using the email
        if (!databaseUser) {
            throw new Error("user not found");
        }

        // Compare passwords from database user and request user
        const isPasswordsMatching = await bcrypt.compare(requestUser.password, databaseUser.password);

        // Throw if passwords don't match
        if (!isPasswordsMatching) {
            throw new Error("invalid credentials");
        }

        // Create token
        const token = crypto.randomBytes(12).toString("hex");

        // Set the time the session expires
        const expiresAt = new Date(Date.now() + Number(process.env.COOKIE_SESSION_EXPIRY_TIME_MS));

        // Create session
        const session = {
            id: token,
            expiresAt,
            userId: databaseUser.id,
        };

        // Create session in database
        const sessionResponse = await Session.create(session);

        // Throw if session doesn't get created
        if (!sessionResponse) {
            throw new Error("failed to create session");
        }

        // Pack a cookie for the response
        res.cookie("sessionId", token, {
            maxAge: Number(process.env.COOKIE_SESSION_EXPIRY_TIME_MS)
        })

        // Return result
        res.status(200);
        res.send(databaseUser);
    }
    catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};

// SIGN OUT USER
exports.signOut = async (req, res, next) => {
    try {
        // Session ID
        const sessionId = req.session;

        // Execute SQL
        const currentSession = await Session.findByPk(sessionId);

        if (!currentSession) {
            throw new Error("session not found");
        }

        res.clearCookie("sessionId");

        await currentSession.destroy();

        // Return result
        res.status(200);
        res.send({ success: true });
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};

// CURRENT LOGGED IN USER
exports.whoAmI = async (req, res, next) => {
    try {
        // Session ID
        const sessionId = req.session;

        // Execute SQL
        const currentSession = await Session.findByPk(sessionId);


        if (!currentSession) {
            throw new Error("session not found");
        }

        // Get the user from database using the session's user id
        let currentUser = await User.findOne({
            where: {
                id: currentSession.userId,
            },
            include: [
                {
                    model: Permission,
                    as: 'permission',
                },
            ],
            attributes: { exclude: ['permissionId',] },
        });

        currentUser.permission = currentUser?.permission?.alias ? currentUser.permission.alias : null;

        if (!currentUser) {
            throw new Error("user not found");
        }

        // Return result
        res.status(200);
        res.send(currentUser);
    }
    catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};