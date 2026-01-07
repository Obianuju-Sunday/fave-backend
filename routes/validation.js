const express = require('express');
const router = express.Router();
const ValidationController = require('../controller/ValidationController');

router.post('/validate-user', ValidationController.validateUser);

module.exports = router;