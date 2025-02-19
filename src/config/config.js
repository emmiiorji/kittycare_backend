// src/config/config.js
const dotenv = require('dotenv');
const { google } = require('googleapis');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(4000),

        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),

        SMTP_SERVICE: Joi.string().description('name of service associated with smtp server'),
        SMTP_HOST: Joi.string().description('server that will send the emails'),
        SMTP_PORT: Joi.number().description('port to connect to the email server'),
        SMTP_USERNAME: Joi.string().description('username for email server'),
        SMTP_PASSWORD: Joi.string().description('password for email server'),


        CLIENT_BASE_URL: Joi.string().required().description('the client base url'),

        GOOGLE_OAUTH_CLIENT_ID: Joi.string().required().description('Google Oauth Client ID'),
        GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required().description('Google Oauth Client Secret'),
        GOOGLE_OAUTH_REDIRECT_URL: Joi.string().required().description('Google Oauth Client Secret'),

        OPENAI_API_KEY: Joi.string().default('').description('OpenAI API key'),
        SUPABASE_URL: Joi.string().default('').description('Supabase URL'),
        SUPABASE_ANON_KEY: Joi.string().default('').description('Supabase Anon Key'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    },
    email: {
        smtp: {
            service: envVars.SMTP_SERVICE,
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD,
            },
        },
        from: envVars.EMAIL_FROM,
    },
    googleOauth: {
        GOOGLE_OAUTH_CLIENT_ID: envVars.GOOGLE_OAUTH_CLIENT_ID,
        GOOGLE_OAUTH_CLIENT_SECRET: envVars.GOOGLE_OAUTH_CLIENT_SECRET,
        GOOGLE_OAUTH_REDIRECT_URL: `${envVars.CLIENT_BASE_URL}/${envVars.GOOGLE_OAUTH_REDIRECT_URL}`,
        client: new google.auth.OAuth2(
            envVars.GOOGLE_OAUTH_CLIENT_ID,
            envVars.GOOGLE_OAUTH_CLIENT_SECRET,
            `${envVars.CLIENT_BASE_URL}/${envVars.GOOGLE_OAUTH_REDIRECT_URL}`
        ),
    },
    client: {
        baseUrl: envVars.CLIENT_BASE_URL,
    },
    openai: {
        apiKey: envVars.OPENAI_API_KEY,
    },
    supabase: {
        url: envVars.SUPABASE_URL,
        anonKey: envVars.SUPABASE_ANON_KEY,
    },
};
