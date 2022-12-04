// PACKAGE IMPORTS
const knex = require('knex');
require('dotenv').config();

// ENV
MAIN_DB_HOST = process.env.MAIN_DB_HOST
MAIN_DB_PORT = process.env.MAIN_DB_PORT
MAIN_DB_USER = process.env.MAIN_DB_USER
MAIN_DB_PASSWORD = process.env.MAIN_DB_PASSWORD
MAIN_DB_DATABASE = process.env.MAIN_DB_DATABASE

// CONNECTION
exports.main_db_connection = knex({
    client: 'mysql2',
    connection: {
        host: MAIN_DB_HOST,
        port: MAIN_DB_PORT,
        user: MAIN_DB_USER,
        password: MAIN_DB_PASSWORD,
        database: MAIN_DB_DATABASE
    }
});
