const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders-controller");

router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById);
router.post("/orders", createOrder);
router.put("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

module.exports = router;

/* 
Esquema de datos para una order (La order se podría crear al ingresar al carro)
{
  id_order -> generado automáticamente
  createdAt -> generado automáticamente
  id_user
}
*/
