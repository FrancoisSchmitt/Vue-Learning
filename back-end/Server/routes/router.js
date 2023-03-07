const express = require("express");
const route = express.Router();
const userController = require("../controller/userController");

route.post("/api/users", userController.userCreate);
route.get("/api/findUsers", userController.findUsers);
route.get("/api/findUsers/:id", userController.findUserByID);

module.exports = route;
