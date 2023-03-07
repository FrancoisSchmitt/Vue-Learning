const express = require("express");
const route = express.Router();
const userController = require("../controller/userController");
const auth = require('../middleware/auth');

route.post("/api/userCreate", userController.userCreate);
route.post("/api/userLogin", userController.userLogin);
route.get("/api/findUsers", userController.findUsers);
route.get("/api/findUsers/:id", userController.findUserByID);
route.get("/api/userProfil", auth , userController.userProfile);

module.exports = route;
