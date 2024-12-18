const express = require("express");
const userController = require("./controllers/userController");

const routes = express();

routes.get("/", userController.form);

routes.post("/submit", userController.userInfo);

routes.post("/addTransaction", userController.userTransaction);

module.exports = routes;
