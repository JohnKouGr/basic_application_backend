exports.user = (user_id, user_username, user_password, user_datecreated) => {
    return {
        user_id: user_id,
        user_username: user_username,
        user_password: user_password,
        user_datecreated: user_datecreated
    };
}
