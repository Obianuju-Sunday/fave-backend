// routes/auth.js

const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/AuthController');
const { protect } = require('../middleware/authMiddleware')


router.post('/register', register);
router.post('/login', login);
router.get('/test-protected', protect, (req, res) => {
    res.json({ 
        message: 'You have accessed a protected route', 
        user: req.user 
    });
})

module.exports = router;