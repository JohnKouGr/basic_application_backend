// FILE IMPORTS
const knex_main = require('../../Databases/main_db');

exports.insert_into_user = async (username, password, date_created_at) => {
    const user = await knex_main.insert({ user_username: username, user_password: password, user_datecreatedat: date_created_at }).into('user');

    return user;
}

