// PACKAGE IMPORTS
const express = require('express');
const app = express.Router();

// FILE IMPORTS
const { read_csv_from_path } = require('../FileHandling/read');
const { calc_incomes } = require('../DataCalc/general');
const { insert_into_submission } = require('../Database/Queries/Main_db/insert');
const { currentDate } = require('../DateManipulation/newDate');

app.post('/proccesdatafromfile', async (req, res) => {
    try {
        

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

            await insert_into_submission(req.body.sub_name, json_data, currentDate(), );

            res.status(200).send(json_data);
        }
    } catch (err) {
        console.log(err)
        if (res != null) res.status(500).send('Unexpected error.');
    }
});

module.exports = app;


