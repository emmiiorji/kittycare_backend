const config = require('./config');

let allowedRegExpOrigins = [
  // add all acceptable origins allowed in production to this array
  // example: /https:\/\/example.com$/
];

if (config.env === 'development') {
  allowedRegExpOrigins = [
    ...allowedRegExpOrigins,
    /http:\/\/localhost:[0-9]{4,5}$/,
    /http:\/\/127.0.0.1:[0-9]{4,5}$/,
  ];
}

const validateOrigin = (origin) => {
  const validationStatus = Array.from(allowedRegExpOrigins, (regExpPattern) => regExpPattern.test(origin)).some(Boolean);
  return validationStatus;
};

module.exports = validateOrigin;
