// FILE IMPORTS
const knex_main = require('../../Databases/main_db');

exports.select_all_users = async () => {
    const users = await knex_main.select('*').from('user');

    return users;
}

exports.select_user_by_id = async (user_id) => {
    const user = await knex_main.select('*').from('user').where({ user_id: user_id }).first();

    return user;
}

exports.select_user_by_username = async (username) => {
    const user = await knex_main.select('*').from('user').where({ user_username: username }).first();

    return user;
}

exports.select_sub_by_id = async (sub_id) => {
    const sub = await knex_main.select('*').from('submission').where({ sub_id: sub_id }).first();

    return sub;
}

exports.select_subs_by_user_id = async (user_id) => {
    const subs = await knex_main.select('*').from('submission').where({ sub_user_id: user_id });

    return subs;
}