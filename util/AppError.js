class AppError extends Error{
    constructor(errorType, message, statusCode, ){
        super(message)
        this.errorType = errorType || 'AppError',
        this.statusCode = statusCode
    }
}