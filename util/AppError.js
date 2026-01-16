// util/AppError.js

class AppError extends Error {
    constructor( statusCode, errorMessage, isOperational = true ) {
        super(errorMessage)
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError; 
