const AppError = require("../util/AppError");

const errorMiddleware = (err, req, res, next) => {
    const error = err;

    if(!(error instanceof AppError)){
        error = new AppError({
            errorType: "AppError",
            errorCode: "INTERNAL_SERVER_ERROR",
            statusCode: 500,
            statusText: "Internal Server Error",
            errorMessage: error.message
        });
    }

    const response = {
        success: false,
        errorType: error.errorType || "AppError",
        errorMessage: error.message || "Internal Server Error",
        errorCode: error.errorCode || "INTERNAL_SERVER_ERROR",
        statusText: error.statusText || "Internal Server Error",
        fieldError: error.fieldError || null
    };

    res.status(error.statusCode || 500).json(response);
};

module.exports = errorMiddleware;
