const express = require("express");
const userController = require("./controllers/userController");

const routes = express();

routes.get("/", userController.form);

routes.post("/user", userController.user);

module.exports = routes;
