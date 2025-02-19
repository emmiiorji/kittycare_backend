const httpStatus = require('http-status');
const authService = require('../services/authService');

const getGoogleOauthURL = async (req, res) => {
    const url = authService.getGoogleOauthURL();
    res.json({ url });
};

module.exports = {
    getGoogleOauthURL,
};

