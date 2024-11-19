const express = require("express");
const { connection, initDB } = require("./config/database");
const userController = require("./controllers/userController");

const routes = express();

routes.get("/", userController.form);

routes.post("/user", userController.user);

module.exports = routes;
