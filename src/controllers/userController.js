const path = require("path"); //NEW
const { connection } = require("../config/database");

const form = (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
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
  const { first_name, second_name, email, age, phone, eircode, password} = req.body;


  const add =
    "INSERT INTO mysql_table (first_name,second_name, email, age, phone, eircode, password) VALUES (?,?,?,?,?,?,?)";
  connection.query(
    add,
    [first_name, second_name, email, age, phone, eircode, password],
    (err) => {
      if (err) {
        console.log("Error inserting user:", err);
      }
      res.sendFile(path.join(__dirname, "../frontend/login.html"));
    }
  );
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

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM mysql_table WHERE email = ?";

  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).send("Server error");
    }

    if (results.length > 0) {
      // Add password checking logic here if implemented
      res.sendFile(path.join(__dirname, "../frontend/index.html"));
    } else {
      res.status(401).send("Invalid email or password");
    }
  });
};

module.exports = { form, userInfo, userTransaction, getTransactions, loginUser};
