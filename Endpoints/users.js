// FILE IMPORTS
const app = require('../app');
const {select_all_users} = require('../Database/Queries/Main_db');

app.get('/users', (req, res) => {

    const users = select_all_users();

    if(!users) res.status(500).send("Missing data!");

    res.send(users);
  });
  