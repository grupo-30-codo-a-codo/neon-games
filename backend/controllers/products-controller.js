const connection = require("../config/dbConfig");

const getProducts = async (req, res) => {
  const sqlQuery = "SELECT * FROM products";
  connection.query(sqlQuery, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(result);
  });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM products WHERE id_product = ?";
  connection.query(sqlQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(result[0]);
  });
};

const createProduct = async (req, res) => {
  const newProduct = req.body;
  const sqlQuery = "INSERT INTO products SET ?";
  connection.query(sqlQuery, newProduct, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ id: result.insertId, ...newProduct });
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const sqlQuery = "UPDATE products SET ? WHERE id_product = ?";
  connection.query(sqlQuery, [updatedProduct, id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ id, ...updatedProduct });
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "DELETE FROM products WHERE id_product = ?";
  connection.query(sqlQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
