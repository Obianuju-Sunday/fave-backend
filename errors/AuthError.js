const AppError = require("../util/AppError");

class AuthError extends AppError {
    constructor(errorMessage = 'Authentication Failed', statusCode = 401) {
        super(statusCode, errorMessage);
        this.name = 'AuthError'
    }
}

module.exports = AuthError;