// require csvtojson
var csv = require("csvtojson");

exports.read_csv_from_path = async (buffer) => {

  const file = await csv().fromString(buffer.toString());

  return file;
}

