const path = require("path"); //NEW
const { connection } = require("../config/database");

let loggedUserinfo = null;

const form = (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
};

const userTransaction = (req, res) => {
  if (!loggedUserinfo) {
    return res.status(401).send("User not logged in");
  }

  const { date, type, walletDropdown, description, category, value } = req.body;

  const add =
    "INSERT INTO Transactions ( Date, type, Wallet, Description, Category, Value, userInfo_id) VALUES (?,?,?,?,?,?,?)";

  connection.query(
    add,
    [
      date,
      type,
      walletDropdown,
      description,
      category,
      value,
      loggedUserinfo.userInfo_id,
    ],
    (err) => {
      if (err) {
        console.log("error inserting transaction: ", err);
      }
      res.sendFile(path.join(__dirname, "../frontend/index.html"));
    },
  );
};

const userInfo = (req, res) => {
  const { first_name, second_name, email, age, phone, eircode, password } =
    req.body;

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
    },
  );
};

const getTransactions = (req, res) => {
  const query = "SELECT * FROM Transactions WHERE userInfo_id = ?";
  connection.query(query, [loggedUserinfo.userInfo_id], (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      res.status(500).send("Error fetching transactions");
    } else {
      res.json(results);
    }
  });
};

const deleteTransaction = (req, res) => {
  const { transaction_id } = req.body;
  const query = "DELETE FROM Transactions WHERE transaction_id = ?";
  connection.query(query, [transaction_id], (err) => {
    if (err) {
      console.error("Error deleting transaction:", err);
      res.status(500).send("Error deleting transaction");
    } else {
      res.send("Transaction deleted");
    }
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM mysql_table WHERE email = ?";

  connection
    .promise()
    .query(query, [email])
    .then(([rows]) => {
      if (rows.length > 0) {
        const { password: __, ...user } = rows[0]; // destructuring the user object and ignoring the password
        if (rows[0].password !== password) {
          res.status(401).send("Invalid email or password");
          return;
        }
        loggedUserinfo = user;
        console.log("Logged in user:", loggedUserinfo);

        const fs = require("fs");
        const indexPath = path.join(__dirname, "../frontend/index.html");

        fs.readFile(indexPath, "utf8", (err, data) => {
          if (err) {
            console.error("Error reading HTML file:", err);
            res.status(500).send("Error loading page");
            return;
          }

          // Changing the 'user' name displayed on the front end trhough the HTML file
          const updatedHTML = data.replace(
            "Hello User",
            `Hello ${loggedUserinfo.first_name}`,
          );

          res.send(updatedHTML);
        });
      } else {
        res.status(401).send("Invalid email or password");
      }
    })
    .catch((err) => {
      console.error("Error checking user:", err);
      res.status(500).send("Server error");
    });
};

module.exports = {
  form,
  userInfo,
  userTransaction,
  getTransactions,
  loginUser,
  deleteTransaction,
};
