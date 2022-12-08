// FILE IMPORTS
const knex_main = require('../../Databases/main_db');
const { select_user_by_id, select_sub_by_id } = require('./select');

exports.insert_into_user = async (username, password, date_created_at) => {
    const user_id = await knex_main.insert({ user_username: username, user_password: password, user_date_created_at: date_created_at }).into('user');
    const user = await select_user_by_id(user_id);

    return user;
}

exports.insert_into_submission = async (name, data, date_created_at, user_id) => {
    const sub_id = await knex_main.insert({ sub_user_id: user_id, sub_name: name, sub_data: JSON.stringify(data), sub_date_created_at: date_created_at }).into('submission');
    const sub = await select_sub_by_id(sub_id);

    return sub;
}

