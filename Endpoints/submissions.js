// PACKAGE IMPORTS
const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');

// FILE IMPORTS
const { read_csv_from_path } = require('../FileHandling/read');
const { calc_incomes } = require('../DataCalc/general');
const { insert_into_submission } = require('../Database/Queries/Main_db/insert');
const { currentDate } = require('../DateManipulation/newDate');
const { select_user_by_username, select_subs_by_user_id } = require('../Database/Queries/Main_db/select');

app.post('/proccesdatafromfile', async (req, res, next) => {
    try {
        const access_token = req.headers.authorization.split(' ')[1];
        const username = jwt.decode(access_token).split(" ")[0];
        const type = jwt.decode(access_token).split(" ")[1];

        if (!access_token || type != 'a') res.status(422).send('Access token is required!');

        if (!req.files) {
            res.status(422).send('No file uploaded.');

        } else if (!req.body) {
            res.status(422).send('missing data factor.');

        } else {
            const csv_file_buffer = await req.files.csv_file.data;

            const json_data = await read_csv_from_path(csv_file_buffer);
            const dataInc = await calc_incomes(json_data, req);

            for (const inner_data of json_data) {
                delete inner_data.field4;
                delete inner_data.field5;
            }
            for (const inner_data of json_data) {
                inner_data.Income = dataInc[inner_data.Year];
            }

            const user = await select_user_by_username(username);

            if (!user) res.status(401).send('Account not found...');

            const sub = await insert_into_submission(req.body.sub_name, json_data, currentDate(), user.user_id);

            res.status(200).send(sub);
        }
    } catch (err) {
        console.log(err)
        return next();
    }
});

app.get('/usersubs', async (req, res, next) => {
    try {
        const access_token = req.headers.authorization.split(' ')[1];
        const username = jwt.decode(access_token).split(" ")[0];
        const type = jwt.decode(access_token).split(" ")[1];

        if (!access_token || type != 'a') res.status(422).send('Access token is required!');

        const user = await select_user_by_username(username);

        if (!user) res.status(401).send('Something went wrong try logging in again!');

        const subs = await select_subs_by_user_id(user.user_id);

        res.status(200).send(subs);
    } catch (err) {
        console.log(err)
        return next();
    }
});

module.exports = app;


