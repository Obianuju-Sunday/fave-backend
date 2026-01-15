// routes/auth.js

const express = require('express');
const router = express.Router();
const { register, login, forgotPassword } = require('../controller/AuthController');
const { protect } = require('../middleware/authMiddleware')


router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

router.get('/test-protected', protect, (req, res) => {
    res.json({ 
        success: true,
        message: 'You have accessed a protected route', 
        user: {email: req.user.email, id: req.user.id}
    });
})

module.exports = router;