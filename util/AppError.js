// AppError.js

class AppError extends Error {
    constructor(errorCode, errorType, errorMessage, statusCode, statusText, fieldError) {
        super(errorMessage)
        this.errorCode = errorCode,
        this.errorType = errorType || 'AppError',
        this.statusCode = statusCode,
        this.statusText = statusText
        this.fieldError = fieldError || null
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError; 
