const connection = require('../config/dbConfig');

const getOrders = async (req, res) => {
  const sqlQuery = "SELECT * FROM orders";
  connection.query(sqlQuery, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(result);
  });
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM orders WHERE id_order = ?";
  connection.query(sqlQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(result[0]);
  });
};

const createOrder = async (req, res) => {
  const newOrder = req.body;
  const sqlQuery = "INSERT INTO orders SET ?";
  connection.query(sqlQuery, newOrder, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ id: result.insertId, ...newOrder });
  });
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const updatedOrder = req.body;
  const sqlQuery = "UPDATE orders SET ? WHERE id_order = ?";
  connection.query(sqlQuery, [updatedOrder, id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ id, ...updatedOrder });
  });
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "DELETE FROM orders WHERE id_order = ?";
  connection.query(sqlQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  });
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};