const AppError = require("../util/AppError");

class ValidationError extends AppError {
    constructor(message = 'Validation Error', statusCode = 400, errorMessage) {
        super('ValidationError', statusCode, errorMessage);
    }
}

module.exports = ValidationError;