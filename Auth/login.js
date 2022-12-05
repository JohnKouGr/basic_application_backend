// PACKAGE IMPORTS
const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt');

// FILE IMPORTS
const generateAccessToken = require('./config')
const { select_user_by_username } = require('../Database/Queries/Main_db/select')

app.post('/login', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) res.status(422).send('Missing data for authentication.');

        const user = await select_user_by_username(req.body.username);

        if (!user) res.status(500).send('Account doesnt exist');

        const correct_password = await bcrypt.compare(req.body.password, user.user_password);

        if (!correct_password) res.status(500).send('Account doesnt exist.');

        const token = generateAccessToken(req.body.username);

        res.status(200).send({ access_token: token, refresh_token: 'Something else...' });
    } catch (err) {
        console.log(err);
    }

});

module.exports = app;


