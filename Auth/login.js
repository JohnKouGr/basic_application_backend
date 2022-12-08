// PACKAGE IMPORTS
const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// FILE IMPORTS
const { generateAccessToken, generateRefreshToken } = require('./config');
const { select_user_by_username } = require('../Database/Queries/Main_db/select');

SECRET_TOKEN = process.env.TOKEN_SECRET;

app.post('/login', async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) res.status(422).send('Missing data for authentication.');

        const user = await select_user_by_username(req.body.username);

        if (!user) res.status(500).send('Account doesnt exist');

        const correct_password = await bcrypt.compare(req.body.password, user.user_password);

        if (!correct_password) res.status(500).send('Account doesnt exist.');

        const token = generateAccessToken(req.body.username);
        const tokenR = generateRefreshToken(req.body.username);

        res.status(200).send({ access_token: token, refresh_token: tokenR });
    } catch (err) {
        console.log(err);
        return next();
    }
});

app.get('/verifytoken', async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) res.status(422).send('Token is required!');

        jwt.verify(token, SECRET_TOKEN);
        const username = jwt.decode(token);

        res.status(200).send({ token: token, username: username.split(" ")[0] });
    } catch (err) {
        console.log(err);
        return next();
    }
});

app.get('/refreshtoken', async (req, res, next) => {
    try {
        const refresh_token = req.headers.authorization.split(' ')[1];
        const username = jwt.decode(access_token).split(" ")[0];
        const type = jwt.decode(access_token).split(" ")[1];

        if (!refresh_token || type != 'r') res.status(422).send('Refresh token is required!');

        const access_token = generateAccessToken(username);

        res.status(200).send({ access_token: access_token, refresh_token: refresh_token });
    } catch (err) {
        console.log(err);
        return next();
    }
});

module.exports = app;


