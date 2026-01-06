class AppError extends Error{
    constructor(errorType, errorMessage, errorCode, statusCode, statusText, fieldError){
        super(errorMessage)
        this.errorType = errorType || 'AppError',
        this.errorCode = errorCode,
        this.statusCode = statusCode,
        this.statusText = statusText,
        this.fieldError = fieldError,
        Error.captureStackTrace(this, this.constructor)
    }
}