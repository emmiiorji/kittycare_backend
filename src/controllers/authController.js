// const httpStatus = require('http-status');
const authService = require('../services/authService');

const getGoogleOauthURL = async (req, res) => {
    try {
        const url = authService.getGoogleOauthURL();
        res.json({ url });
    } catch (error) {
        //
    }
};

const googleOAuth = async (req, res) => {
    try {
        const { code } = req.query;
        const response = await authService.googleOAuth(code);
        if (response.error) {
            return res.status(httpStatus.BAD_REQUEST).json({ error: response.error });
        }
        res.json(response);
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = {
    getGoogleOauthURL,
    googleOAuth,
};

