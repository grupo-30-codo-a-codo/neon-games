const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users-controller");
const authHandler = require("../middlewares/authHandler");
router.get("/users", usersControllers.getAllUsers);
router.get("/users/:id", usersControllers.getUserById);
router.post("/users", usersControllers.registerUser);
router.post(
  "/users/login",
  authHandler.authenticateUser,
  usersControllers.logIn
);
router.put("/users/:id", usersControllers.updateUserById);
router.delete("/users/:id", usersControllers.deleteUserById);

module.exports = router;
