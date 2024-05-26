require('dotenv').config();

// SIGN UP USER
exports.signUp = async (req, res, next) => {
    try {
        // Return result
        res.status(200);
        res.send({ success: true });
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
        // Return result
        res.status(200);
        res.send({ success: true });
    }
    catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};

// SIGN OUT USER
exports.signOut = async (req, res, next) => {
    try {
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
        // Return result
        res.status(200);
        res.send(currentUser);
    }
    catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};