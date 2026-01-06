class AppError extends Error{
    constructor(errorType, errorCode, statusCode, statusText, errorMessage){
        super(errorMessage)
        this.errorType = errorType || 'AppError',
        this.errorCode = errorCode,
        this.statusCode = statusCode,
        this.statusText = statusText

        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError; 
