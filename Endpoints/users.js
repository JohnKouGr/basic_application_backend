// PACKAGE IMPORTS
const express = require('express');
const app = express.Router();

// FILE IMPORTS
const { select_all_users } = require('../Database/Queries/Main_db/select');

app.get('/users', async (req, res) => {
    try {
        const users = await select_all_users();

        if (!users) res.status(500).send("Missing data!");

        res.status(200).send({ users: users });
    } catch (err) {
        console.log(err);
    }
});

module.exports = app;
