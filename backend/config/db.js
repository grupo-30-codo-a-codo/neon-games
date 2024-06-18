const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos.", err);
    return;
  }
  console.log("Conectado a la base de datos.");
});

module.exports = connection;
