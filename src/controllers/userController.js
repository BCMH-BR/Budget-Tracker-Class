const path = require("path"); //NEW
const { connection } = require("../config/database");

const form = (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/form.html"));
};

const userTransaction = (req, res) => {
  const { date, type, walletDropdown, description, category, value } = req.body;

  const add =
    "INSERT INTO Transactions ( Date, type, Wallet, Description, Category, Value) VALUES (?,?,?,?,?,?)";

  connection.query(
    add,
    [date, type, walletDropdown, description, category, value],
    (err) => {
      if (err) {
        console.log("error inserting transaction: ", err);
      }
      res.sendFile(path.join(__dirname, "../frontend/index.html"));
    }
  );
};

const userInfo = (req, res) => {
  const { name, email, age, phone, eircode } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).send("Name is required");
  }

  const add =
    "INSERT INTO UsersInfo (user_name, email, age, phone, eircode) VALUES (?,?,?,?,?)";
  connection.query(add, [name, email, age, phone, eircode], (err) => {
    if (err) {
      console.log("Error inserting user:", err);
    }
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
  });
};

const getTransactions = (req, res) => {
  const query = "SELECT * FROM Transactions";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      res.status(500).send("Error fetching transactions");
    } else {
      res.json(results);
    }
  });
};

module.exports = { form, userInfo, userTransaction, getTransactions };

