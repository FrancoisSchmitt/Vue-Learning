const express = require("express");
const route = express.Router();
const userController = require("../controller/userController");

route.post("/api/users", userController.userCreate);

module.exports = route;
