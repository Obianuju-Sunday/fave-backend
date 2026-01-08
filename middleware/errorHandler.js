// middleware/errorMiddleware.js

const AppError = require("../util/AppError");
const ValidationError = require("../errors/ValidationError");
const AuthError = require("../errors/AuthError");

const errorHandler = (err, req, res, next) => {
    const error = err;
    console.error("Error:", error);

    // Handle specific error types

    if (error instanceof ValidationError) {
        error = new AppError({
            errorType: "ValidationError",
            errorMessage: error.message,
            statusCode: 400
        });
    } else if (error instanceof AuthError) {
        error = new AppError({
            errorType: "AuthError",
            errorMessage: error.message,
            statusCode: 401
        });
    } else if (!(error instanceof AppError)) {
        error = new AppError({
            errorType: "AppError",
            errorMessage: error.message,
            statusCode: 500
        });
    }

    const response = {
        success: false,
        errorType: error.errorType || "AppError",
        errorMessage: error.message || "Internal Server Error",
        statusCode: error.statusCode || 500
    };

    res.status(error.statusCode || 500).json(response);
};

module.exports = errorHandler;
