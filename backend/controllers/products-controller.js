const connection = require("../config/dbConfig");

const getProducts = async (req, res) => {
  const sqlQuery = "SELECT * FROM products";
  let products = [];
  connection.query(sqlQuery, (error, result) => {
    if (error) throw Error;
    // console.log(result)
    res.json(result);
  });
};

const getProductById = async (req, res) => {

}


// const createProduct = async (req, res) => {};
// const updateProduct = async (req, res) => {};
// const deleteProduct = async (req, res) => {};

module.exports = getProducts;
