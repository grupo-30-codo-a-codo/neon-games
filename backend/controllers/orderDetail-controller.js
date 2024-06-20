const connection = require("../config/dbConfig");

const getOrderDetails = async (req, res) => {
  const sqlQuery = "SELECT * FROM order_detail";
  connection.query(sqlQuery, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(result);
  });
};

const getOrderDetailById = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM order_detail WHERE id_orderDetail = ?";
  connection.query(sqlQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    res.json(result[0]);
  });
};

const createOrderDetail = async (req, res) => {
  const newOrderDetail = req.body;
  const sqlQuery = "INSERT INTO order_detail SET ?";
  connection.query(sqlQuery, newOrderDetail, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ id: result.insertId, ...newOrderDetail });
  });
};

const updateOrderDetail = async (req, res) => {
  const { id } = req.params;
  const updatedOrderDetail = req.body;
  const sqlQuery = "UPDATE order_detail SET ? WHERE id_orderDetail = ?";
  connection.query(sqlQuery, [updatedOrderDetail, id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    res.json({ id, ...updatedOrderDetail });
  });
};

const deleteOrderDetail = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "DELETE FROM order_detail WHERE id_orderDetail = ?";
  connection.query(sqlQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    res.json({ message: "Order detail deleted successfully" });
  });
};

module.exports = {
  getOrderDetails,
  getOrderDetailById,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
};
