// FILE IMPORTS
const knex_main = require('../../Databases/main_db');

exports.select_all_users = async () => {
    const users = await knex_main.raw('SELECT * FROM user');

    return users;
}