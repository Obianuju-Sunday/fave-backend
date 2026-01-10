// middleware/errorMiddleware.js

const AppError = require("../util/AppError");
const ValidationError = require("../errors/ValidationError");

const errorHandler = (err, req, res, next) => {

    let error = err;

    // Handle Mongoose Validation Errors

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(e => e.message).join(', ');
        error = new ValidationError(message, 400);
    }

    // Handle errors not instance of AppError
    if (!(error instanceof AppError)) {
        error = new AppError(
            "AppError",
            500,
            error.message || 'An unexpected error occurred'
        );
    }

    const response = {
        success: false,
        errorType: error.errorType,
        errorMessage: error.message,
        statusCode: error.statusCode
    };

    res.status(error.statusCode).json(response);
};

module.exports = errorHandler;