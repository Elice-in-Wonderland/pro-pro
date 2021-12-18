const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  secretKey: process.env.JWT_SECERT,
  options: {
    algorithm: process.env.JWT_ALGO,
    expiresIn: '1d',
    issuer: 'jay',
  },
  refreshOptions: {
    algorithm: process.env.JWT_ALGO,
    expiresIn: '14d',
    issuer: 'jay',
  },
};
