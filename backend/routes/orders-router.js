const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getCompleteOrderById,
} = require("../controllers/orders-controller");

const authControllers = require("../middlewares/authHandler");

router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById);
router.get(
  "/orders/complete/:id",
  authControllers.verifyToken,
  getCompleteOrderById
);
//Se agregó el middleware para validar que el usuario tenga un jwt válido antes de crear una orden, por ejemplo
router.post("/orders", authControllers.verifyToken, createOrder);
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
