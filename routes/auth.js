const express = require('express');
const router = express.Router();
// const register = require('../controller/Authcontroller');

const AuthController = require('../controller/Authcontroller')

router.post('/register', AuthController.register)

module.exports = router; 