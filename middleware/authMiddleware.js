
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');


const protect = (req, res, next) => {

    try {
        let token;

        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AuthError('Access denied. No token provided.')); 
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            email: decoded.email
        };

        return next();

    } catch (err) {

        if (err.name === 'JsonWebTokenError') {
            return next(new AuthError('Invalid token.'));
        }

        if (err.name === 'TokenExpiredError') {
            return next(new AuthError('Token expired.'));
        }

        if(err.name === 'NotBeforeError'){
            return next(new AuthError('Token not active yet.'))
        }

        next(err);
    }

}

module.exports = {
    protect
};