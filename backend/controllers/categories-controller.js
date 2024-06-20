const connection = require("../config/dbConfig");

const getCategories = async (req, res) => {
  const sqlQuery = "SELECT * FROM categories";
  connection.query(sqlQuery, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(result);
  });
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM categories WHERE id_category = ?";
  connection.query(sqlQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(result[0]);
  });
};

const createCategory = async (req, res) => {
  const newCategory = req.body;
  const sqlQuery = "INSERT INTO categories SET ?";
  connection.query(sqlQuery, newCategory, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ id: result.insertId, ...newCategory });
  });
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const updatedCategory = req.body;
  const sqlQuery = "UPDATE categories SET ? WHERE id_category = ?";
  connection.query(sqlQuery, [updatedCategory, id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ id, ...updatedCategory });
  });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "DELETE FROM categories WHERE id_category = ?";
  connection.query(sqlQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  });
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
