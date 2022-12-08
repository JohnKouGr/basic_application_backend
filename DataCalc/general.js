
exports.calc_incomes = async (json_data, req) => {
    const new_json_lista = [];
    let i = -1;

    for await (const data of json_data) {
        i = i + 1;

        let dataInc = data.Income.replace('$', '');
        dataInc = dataInc.replace(/,/g, '');
        dataInc = parseFloat(dataInc).toFixed(2);

        if (i == 0) new_json_lista.push(dataInc * req.body.factor_year_0);
        if (i > 0 && i < 8) new_json_lista.push(dataInc * req.body.factor_year_1_7);
        if (i > 7 && i < 31) new_json_lista.push(dataInc * req.body.factor_year_8_30);
    }

    return new_json_lista;
}

// EXPENSES AND OTHER WOULD GO BELOW HERE AND FOLLOW THE SAME PATTERN AS INCOMES
