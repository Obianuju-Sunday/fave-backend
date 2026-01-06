
const errorMiddleware = (err, req, res, next) => {
    const error = err;
    res.status(error.statusCode || 500).json({
        success: false,
        errorType: error.errorType || "AppError",
        errorMessage: error.message || "Internal Server Error",
        errorCode: error.errorCode || "INTERNAL_SERVER_ERROR",
        statusText: error.statusText || "Internal Server Error",
        fieldError: error.fieldError || null
    });
};

module.exports = errorMiddleware;
