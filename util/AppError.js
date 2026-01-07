// AppError.js

class AppError extends Error {
    constructor(errorType, errorMessage, statusCode, ) {
        super(errorMessage)
        this.errorType = errorType || 'AppError',
        this.statusCode = statusCode,
        
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError; 
