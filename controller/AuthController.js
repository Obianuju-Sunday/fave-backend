
// controllers/AuthController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const ValidationError = require('../errors/ValidationError');
const AuthError = require('../errors/AuthError');
const crypto = require('crypto');

const register = async (req, res, next) => {

    try {
        const { name, email, phone, password } = req.body;

        // Validate input fields
        if (!name || !email || !password) {
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
            if (process.env.NODE_ENV === 'development') {
                console.log('Password validation FAILED');
            }

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
            if (process.env.NODE_ENV === 'development') {
                console.log('User with this email already exists');
            }
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
            success: true,
            message: 'User registered successfully'
        });

    } catch (err) {

        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        // Accept and extract email and password from request body
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            throw new ValidationError('Email and password are required');
        }

        // Data type validation
        if (typeof email !== 'string' || typeof password !== 'string') {
            throw new ValidationError('Invalid data types provided. Email and password must be strings');
        }

        // Sanitize email input 
        const sanitizedEmail = validator.normalizeEmail(email.trim());
        const sanitizedPassword = password.trim();

        // Email validation
        if (!validator.isEmail(sanitizedEmail)) {
            throw new ValidationError('Invalid email format');
        }

        // Find user by email in database
        const user = await User.findOne({ email: sanitizedEmail }).select('+password');
        if (!user) {
            if (process.env.NODE_ENV === 'development') {
                console.log('No user found with this email');
            }
            throw new AuthError('Invalid credentials');
        }

        // compare user password
        const isPasswordMatch = await bcrypt.compare(sanitizedPassword, user.password);
        if (!isPasswordMatch) {
            if (process.env.NODE_ENV === 'development') {
                console.log('Incorrect password provided');
            }
            throw new AuthError('Invalid credentials');
        }


        const jwtToken = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '7h'
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token: jwtToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    isVerified: user.isVerified
                }
            }
        });
    } catch (err) {
        next(err);
    }
}

const forgotPassword = async (req, res, next) => {

    try {
        const { email } = req.body;

        const sanitizedEmail = validator.normalizeEmail(email.trim());

        if (!validator.isEmail(sanitizedEmail)) {
            return next(new ValidationError('Invalid email format'));
        }

        const user = await User.findOne({ email: sanitizedEmail });

        if (!user) {
            if (process.env.NODE_ENV === 'development') {
                console.log('No user found with this email for password reset');
            }
            return next(new AuthError('We will send you an email to reset your password'));
        }


        // Generate password random bytes, convert to hex & hash

        const randomBytes = crypto.randomBytes(32);
        const resetToken = randomBytes.toString('hex')
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        const tokenExpiration = new Date(Date.now() + 10 * 60 * 1000);

        // Store in database
        user.passwordResetToken = hashedToken;
        user.passwordResetExpires = tokenExpiration

        await user.save();

        // const resetUrl = `${process.env.RESET_URL}/reset-password/${resetToken}`

        // await sendEmail(user.email, resetUrl)
        if (process.env.NODE_ENV === 'development') {
            console.log('Reset URL:', `http://localhost:3000/reset-password/${resetToken}`);
        }

        res.status(200).json({
            success: true,
            message: 'Password reset email sent'
        })
    } catch (err) {
        if (process.env.NODE_ENV === 'development') {
            console.log(err)
        }
        // user.passwordResetToken = '';
        // user.passwordResetExpires = '';
        next(err)
    }

}

module.exports = {
    register,
    login,
    forgotPassword
}; 