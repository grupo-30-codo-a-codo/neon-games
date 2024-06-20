const connection = require("../config/dbConfig");

const getCategories = async (req, res) => {
  const sqlQuery = "SELECT * FROM categories";
  let categories = {};
  connection.query(sqlQuery, (error, result) => {
    if (error) throw Error;
    res.json(result);
  });
};

module.exports = getCategories;
