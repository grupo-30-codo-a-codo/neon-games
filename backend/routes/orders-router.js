const express = require("express");
const router = express.Router();

const getOrders = require('../controllers/orders-controller');

router.get('/orders', getOrders);


module.exports = router;