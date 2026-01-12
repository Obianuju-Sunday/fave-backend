const AppError = require("../util/AppError");

class AuthError extends AppError {
    constructor(errorMessage = 'Authentication Failed', statusCode = 401) {
        super('AuthError', statusCode, errorMessage);
    }
}

module.exports = AuthError;