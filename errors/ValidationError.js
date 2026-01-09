// errors/ValidationError.js

const AppError = require("../util/AppError");

class ValidationError extends AppError {
    constructor(errorMessage = 'Validation Failed', statusCode = 400) {
        super('ValidationError', statusCode, errorMessage);
    }
}

module.exports = ValidationError;