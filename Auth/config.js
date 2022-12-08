// PACKAGE IMPORTS
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ACCESS_TOKEN_EXPIRATION_TIME = '3600';
SECRET_TOKEN = process.env.TOKEN_SECRET

exports.generateAccessToken = (username) => {
  return jwt.sign(username + " " + "a" + " " + Math.random(), SECRET_TOKEN);
}
exports.generateRefreshToken = (username) => {
  return jwt.sign(username + " " + "r" + " " + Date.now(), SECRET_TOKEN);
}
