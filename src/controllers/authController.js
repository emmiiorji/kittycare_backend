const httpStatus = require('http-status');
const authService = require('../services/authService');

const getGoogleOauthURL = async (req, res) => {
    const url = authService.getGoogleOauthURL();
    res.json({ url });
};

const googleOAuth = async (req, res) => {
    const { code } = req.body;
    const response = await authService.googleOAuth(code);
    if (response.error) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: response.error });
    }
    res.json(response);
};

module.exports = {
    getGoogleOauthURL,
    googleOAuth,
};

