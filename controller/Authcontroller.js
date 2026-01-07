const user = require ('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const AppError = require('../util/AppError');

const register = async (req, res, next) => {

    requiredFields = ['name', 'email', 'password'];
    optionalFields = ['phone'];

    fieldError = [];
    requiredFields.forEach(field => {
        value = req.body[field];
        if (!value) {
            fieldError.push(field);
        }
    });
    if (fieldError.length > 0) {
        return next(new AppError(
            'MISSING_REQUIRED_FIELDS',
            'ValidationError',
            `The following required fields are missing: ${fieldError.join(', ')}`,
            400,
            'Bad Request',
            fieldError
        ));
    }

    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
    
        
        let User = new user({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        });

        await User.save();
        
        res.status(201).json({
            message: 'User Added Successfully!',
            userDetails: User
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    register
}  