const express = require("express");
const routes = require("./routes");
const { connection, initDB } = require("./config/database");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

initDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
