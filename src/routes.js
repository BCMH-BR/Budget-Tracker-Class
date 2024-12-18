const express = require("express");
const userController = require("./controllers/userController");

const routes = express();

routes.get("/", userController.form);

routes.post("/submit", userController.userInfo);

module.exports = routes;
