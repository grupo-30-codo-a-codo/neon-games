const express = require("express");
const router = express.Router();

const getCategories = require('../controllers/categories-controller');

router.get('/categories', getCategories);

module.exports = router;