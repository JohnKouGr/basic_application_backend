// PACKAGE IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();
const port = 8000;

// FILE IMPORTS
// ROUTES
const register = (require('./Auth/register'))
const login = (require('./Auth/login'))
const users = require('./Endpoints/users');
const files = require('./Endpoints/files');

app.use(fileUpload({ createParentPath: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', register);
app.use('/', login)
app.use('/', users);
app.use('/', files);

app.listen(port);



