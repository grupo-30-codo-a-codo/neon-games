const express = require("express");
const router = express.Router();

const getOrderDetails = require("../controllers/orderDetail-controller");

router.get("/order-detail", getOrderDetails);

module.exports = router;