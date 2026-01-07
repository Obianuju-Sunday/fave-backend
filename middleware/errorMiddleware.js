// middleware/errorMiddleware.js

const AppError = require("../util/AppError");

const errorMiddleware = (err, req, res, next) => {
    const error = err;

    if (!(error instanceof AppError)) {
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

module.exports = errorMiddleware;
