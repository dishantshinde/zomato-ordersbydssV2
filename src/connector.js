require("dotenv").config();
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

connection.connect(function (err) {
  if (err)
    return console.log("failed to connect to mysql server/ database", err);
  else return console.log("connection established with Datebase!!!!");
});

module.exports = connection;
