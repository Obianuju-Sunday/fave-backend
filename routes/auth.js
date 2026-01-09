// routes/auth.js

const express = require('express');
const router = express.Router();
const register = require('../controller/AuthController');
const AppError = require('../util/AppError');


router.post('/register', register);


// // Handle unhandled routes
// router.all('*', (req, res, next) => {
//     next(new AppError('AppError', 404, `Can't find ${req.originalUrl} on this server!`));
// });

module.exports = router;