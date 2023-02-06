const jwt = require('jsonwebtoken');

//* Middleware function to authenticate the user
function authenticateUser(req, res, next) {
    //* Get the token from the auth-token header in the request
    const token = req.header('auth-token');

    //* If there is no token, return a 401 status with an "Access Denied" message
    if (!token) return res.status(401).send('Access Denied');

    try {
        //* Verify the token and get the verified data
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        //* Attach the verified data to the request object
        req.user = verified;

        next();
    } catch (err) {
        //* If an error occurs while trying to verify the token, return a 400 status with an "Invalid Token!" message
        res.status(400).send('Invalid Token!');
    }
}

//* Middleware function to authorize the user
function authorizeAdmin(req, res, next) {
    //* Check if the user is an admin
    if (req.user.user.user_is_admin !== 1) {
        return res.status(401).send({ error: 'Unauthorized: Not an admin' });
    }
    next();
}

module.exports = {
    authenticateUser,
    authorizeAdmin,
};