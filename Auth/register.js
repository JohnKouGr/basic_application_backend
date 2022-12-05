// PACKAGE IMPORTS
const express = require('express');
const app = express.Router();
const bcrypt = require("bcrypt")

// FILE IMPORTS
const { insert_into_user } = require('../Database/Queries/Main_db/insert');
const { select_user_by_username } = require('../Database/Queries/Main_db/select');

app.post('/register', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) res.status(422).send('Username and password is needed.');

        const existing_user = await select_user_by_username(req.body.username);

        if (existing_user) res.status(500).send('Username not acceptable!');

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDay();

        const hashed_password = await bcrypt.hash(req.body.password, 10);
        const user = await insert_into_user(req.body.username, hashed_password, `${year}-${month}-${day}`);

        res.status(200).send({ user_id: user[0] });

    } catch (err) {
        console.log(err);
    }
});

module.exports = app;