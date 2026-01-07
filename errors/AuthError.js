const AppError = require("../util/AppError");

class AuthError extends AppError {
    constructor(message = 'Authentication Failed', statusCode = 401, errorMessage) {
        super('AuthError', statusCode, errorMessage);
    }
}

module.exports = AuthError;