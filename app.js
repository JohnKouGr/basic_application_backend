// PACKAGE IMPORTS
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

// FILE IMPORTS
// ROUTES
const users = require('./Endpoints/users');
const register = (require('./Auth/register'))
const login = (require('./Auth/login'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', register);
app.use('/', login)
app.use('/', users);

app.listen(port);



