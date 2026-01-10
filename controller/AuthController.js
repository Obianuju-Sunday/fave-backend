
// controllers/AuthController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const ValidationError = require('../errors/ValidationError');

const register = async (req, res, next) => {

    try {
        const { name, email, phone, password } = req.body;

        // Validate input fields
        if (!name || !email || !password) {
            console.log('Required fields absent');
            throw new ValidationError('Name, email, and password are required');
        }


        // Data Type validation
        if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            throw new ValidationError('Invalid data types provided. All fields must be strings');
        }

        // Sanitize inputs
        const sanitizedEmail = validator.normalizeEmail(email);
        const sanitizedName = validator.escape(name.trim());

        // Email validation
        if (!validator.isEmail(sanitizedEmail)) {
            throw new ValidationError('Invalid email format');
        }


        // Password validation
        if (!validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })) {
            console.log('Password validation FAILED');

            throw new ValidationError('Password must be at least 8 characters with uppercase, lowercase, number, and symbol');
        }


        // Phone validation (if provided)
        if (phone) {
            if (typeof phone !== 'string' || !/^\d{10,15}$/.test(phone)) {
                throw new ValidationError('Phone number must be 10-15 digits');
            }
        }

        // Check if user exists (prevent email enumeration)
        const existingUser = await User.findOne({ email: sanitizedEmail });
        if (existingUser) {
            console.log('User with this email already exists');
            throw new ValidationError('Registration failed');
        }

        // Hash password
        const hashedPass = await bcrypt.hash(password, 12);

        // Create new user using sanitized/validated data
        const newUser = new User({
            name: sanitizedName,
            email: sanitizedEmail,
            phone: phone || undefined,
            password: hashedPass
        });

        await newUser.save();

        return res.status(201).json({
            message: 'User registered successfully'
        });

    } catch (err) {

        next(err);
    }
};

module.exports = register; 