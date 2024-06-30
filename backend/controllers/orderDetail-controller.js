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

const createMultipleOrdersDetails = (req, res) => {
  const newOrderDetails = req.body; // Esperamos recibir un arreglo de detalles de orden en el cuerpo de la solicitud

  // Verificamos que se haya enviado un arreglo de detalles de orden
  if (!Array.isArray(newOrderDetails) || newOrderDetails.length === 0) {
    return res
      .status(400)
      .json({ error: "Se esperaba un arreglo de detalles de orden" });
  }

  // Consulta SQL para insertar los detalles de orden
  const sqlQuery =
    "INSERT INTO order_detail (createdAt, id_product, quantity, price, id_order) VALUES ?";

  // Construimos los valores a insertar como un arreglo de arreglos (cada subarreglo representa los valores de un detalle de orden)
  const values = newOrderDetails.map((detail) => [
    detail.createdAt,
    detail.id_product,
    detail.quantity,
    detail.price,
    detail.id_order,
  ]);

  // Ejecutamos la consulta SQL
  connection.query(sqlQuery, [values], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Devolvemos una respuesta con los IDs de los detalles de orden insertados y los datos de los detalles insertados
    const insertedIds = result.insertId;
    const insertedDetails = newOrderDetails.map((detail, index) => ({
      id: insertedIds + index, // Suponiendo que los IDs autoincrementales comienzan desde insertedIds
      ...detail,
    }));

    res.status(201).json(insertedDetails);
  });
};

module.exports = {
  getOrderDetails,
  getOrderDetailById,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
  createMultipleOrdersDetails
};
