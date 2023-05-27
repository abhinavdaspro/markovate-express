const express = require("express");
const Router = express.Router();
const UserController = require("../controller/UserController")
const JwtMiddleWare = require("../middleware/JWTmiddleWare");


Router.post("/register", UserController.createUser);
Router.post("/login", UserController.login);
Router.get("/find", JwtMiddleWare, UserController.findAll);
Router.get("/find/:id", JwtMiddleWare, UserController.findUser);
Router.patch("/update/:id", JwtMiddleWare, UserController.createUser);

module.exports = Router