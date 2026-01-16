// middleware/errorMiddleware.js

const AppError = require("../util/AppError");
const ValidationError = require("../errors/ValidationError");

const errorHandler = (err, req, res, next) => {

    // let error = { ...err };
    // error.message = err.message;

    // // Handle Mongoose Validation Errors

    // if (err.name === 'ValidationError') {
    //     const message = Object.values(err.errors).map(e => e.message).join(', ');
    //     error = new ValidationError(message, 400);
    // }

    // // Handle errors not instance of AppError
    // if (!(error instanceof AppError)) {
    //     error = new AppError(
    //         "AppError",
    //         500,
    //         error.message || 'An unexpected error occurred'
    //     );
    // }

    // const response = {
    //     success: false,
    //     errorType: error.errorType,
    //     errorMessage: error.message,
    //     statusCode: error.statusCode
    // };

    if (process.env.NODE_ENV === 'development') {
        console.log('Error name:', err.name)
        console.log('Error Message:', err.message)
    }

    let statusCode = err.statusCode || 500;
    let message = err.message;

    // Handle Mongoose Validation Errors

    // if (err.name === 'ValidationError') {
    //     const messages = Object.values(err.errors).map(e => e.message);
    //     message = messages.join(', ');
    //     err = new ValidationError(message, 400);
    // }

    if (
        err.name === 'ValidationError' &&
        err.errors &&
        typeof err.errors === 'object'
    ) {
        const messages = Object.values(err.errors)
            .map(e => e.message)
            .join(', ');

        statusCode = 400;
        message = messages;
    }



    res.status(statusCode).json({
        success: false,
        message
        // message: 'Error handling is working'
    });
};

module.exports = errorHandler;