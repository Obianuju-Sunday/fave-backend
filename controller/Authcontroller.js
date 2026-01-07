const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ValidationError = require('../errors/ValidationError');

const register = async (req, res, next) => {

    try {
        const { name, email, phone, password } = req.body;


        // Validate input fields
        if (!name || !email || !phone || !password) {
            throw new ValidationError('All fields are required', 'MISSING_FIELDS');
        }

        if (password.length < 6) {
            throw new ValidationError('Password must be at least 6 characters long', 'WEAK_PASSWORD');
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            throw new ValidationError('Invalid email format', 'INVALID_EMAIL');
        }

        if (!/^\d{10}$/.test(phone)) {
            throw new ValidationError('Phone number must be 10 digits', 'INVALID_PHONE');
        }

        if (typeof name !== 'string' || typeof email !== 'string' || typeof phone !== 'string' || typeof password !== 'string') {
            throw new ValidationError('Invalid data types provided. All fields must be strings', 'INVALID_DATA_TYPE');
        }

        // Hash the password before saving
        const hashedPass = await bcrypt.hash(req.body.password, 10);

        // Create new user
        const User = new user({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        });

        // check if user already exists
        const existingUser = await user.findOne({ email: User.email });
        if (existingUser) {
            throw new ValidationError('User with this email already exists', 'USER_EXISTS');
        }

        // If user doesn't exist, save user to database
        await User.save();

        // Respond with success message
        res.status(201).json({
            message: 'User Added Successfully!',
            userDetails: User
        });
    } catch (error) {
        // Here I'm passing the error to the error handling middleware
        next(error);
    }

};


module.exports = {
    register
}  