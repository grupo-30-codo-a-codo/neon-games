const connection = require("../config/dbConfig");

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

const getCompleteOrderById = (req, res) => {
  const orderId = req.params.id;
  console.log(orderId);
  // Consulta SQL para obtener la orden y sus productos
  const sql = `SELECT o.id_order, o.createdAt AS orderCreatedAt,
                      od.id_orderDetail, od.createdAt AS detailCreatedAt,
                      od.id_product, od.quantity, od.price
               FROM orders o
               INNER JOIN order_detail od ON o.id_order = od.id_order
               WHERE o.id_order = ?`;

  connection.query(sql, [orderId], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta: " + err.message);
      res.status(500).send("Error del servidor al obtener la orden");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("Orden no encontrada");
      return;
    }

    // Construye la estructura de la orden con sus productos
    const order = {
      id_order: results[0].id_order,
      createdAt: results[0].orderCreatedAt,
      details: [],
    };

    results.forEach((row) => {
      const product = {
        id_orderDetail: row.id_orderDetail,
        createdAt: row.detailCreatedAt,
        id_product: row.id_product,
        quantity: row.quantity,
        price: row.price,
      };
      order.details.push(product);
    });

    // Devuelve la orden con sus productos en formato JSON
    res.json(order);
  });
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getCompleteOrderById,
};
