const express = require("express");
const router = express.Router();
const {
  getOrderDetails,
  getOrderDetailById,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
  createMultipleOrdersDetails,
} = require("../controllers/orderDetail-controller");

const authControllers = require("../middlewares/authHandler");

router.get("/order-details", getOrderDetails);
router.get("/order-details/:id", getOrderDetailById);
router.post("/order-details", authControllers.verifyToken, createOrderDetail);
router.post(
  "/order-details-multiple",
  authControllers.verifyToken,
  createMultipleOrdersDetails
);
router.put("/order-details/:id", updateOrderDetail);
router.delete("/order-details/:id", deleteOrderDetail);

module.exports = router;

/* 
Esquema de datos para una orderDetail (una order detail se podría crear apenas se agrega un item al carro)
{
  id_orderDetail -> generado automáticamente
  createdAt -> generado automáticamente
  id_product
  quantity
  price
  id_order 
}
*/
