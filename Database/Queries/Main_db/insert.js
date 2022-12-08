// FILE IMPORTS
const knex_main = require('../../Databases/main_db');

exports.insert_into_user = async (username, password, date_created_at) => {
    const user = await knex_main.insert({ user_username: username, user_password: password, user_date_created_at: date_created_at }).into('user');

    return user;
}

exports.insert_into_submission = async (name, data, date_created_at, user_id) => {
    const sub = await knex_main.insert({ sub_name: name, sub_data: data, user_date_created_at: date_created_at, sub_user_id: user_id }).into('submission');

    return sub;
}

