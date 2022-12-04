// PACKAGE IMPORTS
const knex = require('knex');

// FILE IMPORTS
import { main_db_connection } from require('../../Databases/main_db');

exports.select_all_users = async () => {
    const users = await knex(main_db_connection).raw('SELECT * FROM user');

    return users;
}