require('dotenv').config();
let mysql = require('mysql');

let con = mysql.createPool({
    connectionLimit : 5,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

module.exports = con;