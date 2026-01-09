// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [30, 'Name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        index: true 
    },
    phone: {
        type: String,
        sparse: true, 
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true 
});

// Index for email queries
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);
module.exports = User;