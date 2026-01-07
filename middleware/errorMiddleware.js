// middleware/errorMiddleware.js

const AppError = require("../util/AppError");

const errorMiddleware = (err, req, res, next) => {
    const error = err;

    if (!(error instanceof AppError)) {
        error = new AppError({
            errorCode: "INTERNAL_SERVER_ERROR",
            errorType: "AppError",
            errorMessage: error.message,
            statusCode: 500,
            statusText: "Internal Server Error",
            fieldError: error.fieldError || null
        });
    }

    const response = {
        success: false,
        errorCode: error.errorCode || "INTERNAL_SERVER_ERROR",
        errorType: error.errorType || "AppError",
        errorMessage: error.message || "Internal Server Error",
        statusCode: error.statusCode || 500,
        statusText: error.statusText || "Internal Server Error",
        fieldError: error.fieldError || null
    };

    res.status(error.statusCode || 500).json(response);
};

module.exports = errorMiddleware;
