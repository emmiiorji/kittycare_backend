const { google } = require('googleapis')
const authService = require('../services/authService');
const config = require('../config/config');

const getGoogleOauthURL = () => {
    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    const options = {
      redirect_uri: config.googleOauth.GOOGLE_OAUTH_REDIRECT_URL,
      client_id: config.googleOauth.GOOGLE_OAUTH_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(' '),
    };
  
    const qs = new URLSearchParams(options);
    return `${rootURL}?${qs.toString()}`;
};

const googleOAuth = async (code) => {
    let userInfo;
    try {
        const oauth2Client = config.googleOauth.client;
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
        const { data } = await oauth2.userinfo.get();
        userInfo = data;
      } catch (error) {
        logger.error(error);
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    // Store user info in jwt token and return the token
    const token = jwt.sign(
        {
            email: userInfo.email,
            firstName: userInfo.given_name,
            lastName: userInfo.family_name,
            picture: userInfo.picture
        },
        config.jwt.secret,
        { expiresIn: config.jwt.accessExpirationMinutes * 60 });
    return token;
};

module.exports = {
    getGoogleOauthURL,
    googleOAuth,
};