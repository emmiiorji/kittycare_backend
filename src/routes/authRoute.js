// src/routes/openaiRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.get('/oauth/google-url', authController.getGoogleOauthURL);

module.exports = router;
