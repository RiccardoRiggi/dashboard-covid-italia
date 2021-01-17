var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dashboard-covid-italia"
});

con.connect(function (err) {
    if (err) throw err;
});

module.exports = con;