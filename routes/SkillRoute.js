const express = require("express");
const Router = express.Router();
const skillController = require("../controller/SkillController")
const JwtMiddleWare = require("../middleware/JWTmiddleWare");


Router.post("/create", JwtMiddleWare, skillController.createSkill);
Router.get("/find", JwtMiddleWare, skillController.findAll);
Router.get("/find/:id", JwtMiddleWare, skillController.findSkill);
Router.patch("/update/:id", JwtMiddleWare, skillController.updateSkill);

module.exports = Router