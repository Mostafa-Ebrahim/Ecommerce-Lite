const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.get('/logout', authController.logout);

module.exports = router;