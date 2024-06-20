const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/users-controller");

router.get("/users", usersControllers.getAllUsers);
router.get("/users/:id", usersControllers.getUserById);
router.post("/users", usersControllers.registerUser);

module.exports = router;
