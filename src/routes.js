const express = require("express");
const userController = require("./controllers/userController");

const routes = express();

routes.get("/", userController.form);

routes.post("/submit", userController.userInfo);

routes.post("/login", userController.loginUser);

routes.post("/addTransaction", userController.userTransaction);

routes.get("/transactions", userController.getTransactions);

module.exports = routes;
