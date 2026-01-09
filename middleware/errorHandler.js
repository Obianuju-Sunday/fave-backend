// middleware/errorMiddleware.js

const AppError = require("../util/AppError");

const errorHandler = (err, req, res, next) => {

    console.error('❌ Error caught:', err);
        console.log('APP ERROR CLASS:', AppError); // should be [class AppError]

    let error = err;

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