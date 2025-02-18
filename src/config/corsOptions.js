const validateOrigin = require('./validateOrigin');

const corsOptions = {
  origin: (origin, callback) => {
    if (validateOrigin(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // allows for use of cookies?
  optionsSuccessStatus: 200, // override the success code for allowed origins
};

module.exports = corsOptions;
