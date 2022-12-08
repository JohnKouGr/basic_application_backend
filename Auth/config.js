// PACKAGE IMPORTS
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ACCESS_TOKEN_EXPIRATION_TIME = '3600';
SECRET_TOKEN = process.env.TOKEN_SECRET

const generateAccessToken = (username) => {
  return jwt.sign(username, SECRET_TOKEN);
}

module.exports = generateAccessToken;