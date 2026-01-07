const AppError = require("../util/AppError");

class ValidationError extends AppError {
    constructor(message = 'Validation Failed', statusCode = 400, errorMessage) {
        super('ValidationError', statusCode, errorMessage);
    }
}

module.exports = ValidationError;