// PACKAGE IMPORTS
const express = require('express');
const app = express.Router();

// FILE IMPORTS
const { select_all_users } = require('../Database/Queries/Main_db/select');

app.get('/users', (req, res) => {

    const users = select_all_users();

    if (!users) res.status(500).send("Missing data!");
 
    res.send(users);
});

module.exports = app;
