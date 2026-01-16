// errors/ValidationError.js

const AppError = require("../util/AppError");

class ValidationError extends AppError {
    constructor(errorMessage = 'Validation Failed', statusCode = 400) {
        super(statusCode, errorMessage);
        this.name = 'ValidationError'
    }
}

module.exports = ValidationError;