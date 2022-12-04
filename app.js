// PACKAGE IMPORTS
const express = require('express');

const app = express();
const port = 8000;

// FILE IMPORTS
// ROUTES
const users = require('./Endpoints/users');

app.use('/', users);

app.listen(port);



