// PACKAGE IMPORTS
const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');

// FILE IMPORTS
const { select_all_users } = require('../Database/Queries/Main_db/select');

app.get('/users', async (req, res,next) => {
    try {
        const access_token = req.headers.authorization.split(' ')[1];
        const type = jwt.decode(access_token).split(" ")[1];

        if (!access_token || type != 'a') res.status(422).send('Access token is required!!!');

        const users = await select_all_users();

        if (!users) res.status(500).send("Missing data!");

        res.status(200).send({ users: users });
    } catch (err) {
        console.log(err);
        return next();
    }
});

module.exports = app;
