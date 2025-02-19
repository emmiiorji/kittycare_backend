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

module.exports = {
    getGoogleOauthURL,
};