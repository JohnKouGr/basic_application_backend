// FILE IMPORTS
const knex_main = require('../../Databases/main_db');

exports.select_all_users = async () => {
    const users = await knex_main.select('*').from('user');

    return users;
}

exports.select_user_by_id = async (user_id) => {
    const user = await knex_main.select('*').from('user').where({user_id : user_id}).first();

    return user;
}