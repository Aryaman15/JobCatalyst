const jwt = require('jsonwebtoken');
const User = require('../../models/user/User.js');

const authmiddleware = async (req, res, next) => {
    try {
        let token;

        // Check if authorization header is present
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            // Extract token from the authorization header
            token = req.headers.authorization.split(" ")[1];
            try {
                // Verify the token
                // console.log(process.env.JWT_SECRET_KEY);
                const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
                // Find the user based on decoded token's ID
                req.user = await User.findById(decode.id).select('-password');
                console.log(req.user);
                // Proceed to the next middleware
                next();
            } catch (error) {
                // Token verification failed
                res.status(401).json({ message: "Not authorized" });
            }
        } else {
            // Authorization header or Bearer token is missing
            res.status(401).json({ message: "Token not present, authorization failed" });
        }
    } catch (error) {
        // Generic error while authenticating
        console.error("Error while authenticating:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = authmiddleware;
