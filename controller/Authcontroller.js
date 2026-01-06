const user = require ('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const AppError = require('../util/AppError');

const register = async (req, res, next) => {
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
        throw new AppError(
            'TestError',
            'TEST_ERROR',
            500,
            'Internal Server Error',
            error
        );
    }
};


module.exports = {
    register
}  