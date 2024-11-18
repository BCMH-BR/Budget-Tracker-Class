const express = require("express");
const { connection } = require("./connection/database");

const routes = express();

routes.get("/", function (req, res) {});

module.exports = routes;
