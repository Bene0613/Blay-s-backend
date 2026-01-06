const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/api/v1/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
