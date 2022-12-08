

exports.currentDate = () => {
    let date = new Date().toLocaleDateString();
    date = date.toString();
    return date;
}