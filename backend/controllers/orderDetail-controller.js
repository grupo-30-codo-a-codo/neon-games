const connection = require("../config/dbConfig");

const getOrderDetails = async (req, res) => {
  const sqlQuery = "SELECT * FROM order_detail";
  let orderDetails = {};
  connection.query(sqlQuery, (error, result) => {
    if (error) throw Error;
    res.json(result);
  });
};

module.exports = getOrderDetails;
