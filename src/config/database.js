const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true, //implementation - initial connection without a database specified
});

function initDB() {
  connection.query("CREATE DATABASE IF NOT EXISTS mysql_db", (err) => {
    if (err) {
      console.error("Error creating database");
      throw err;
    } else {
      console.log("Database created");
    }

    connection.query("USE mysql_db", (err) => {
      if (err) {
        console.error("Error using the created DB");
        throw err;
      } else {
        console.log("Using the new Database");
      }
    });

    const createUserInfoTable = `CREATE TABLE IF NOT EXISTS mysql_table (userInfo_id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(255),second_name VARCHAR(255), email VARCHAR(255) UNIQUE, age INT, phone VARCHAR(15), eircode 
    VARCHAR(10), password VARCHAR(255))`;
    connection.query(createUserInfoTable, function (err) {
      if (err) {
        console.error("Error creating Users Info (mysql_table) table");
        throw err;
      } else {
        console.log("Users Info (mysql_table) Table Created");
      }
    });

    // Name, Age, Email, Phone Number, Eircode, Password
    const csvData = `"John, Doe",30,"johndoe@example.com",0893216548,1YR5DD,"Password@123"
    "Jane, Smith",28,"janesmith@example.com",0892856548,8MH7WE,"SecurePass!456"
    "Michael, Johnson",35,"michaeljohnson@example.com",0898523694,7RP0RR,"StrongPass#789"
    "Tommy, Bean",40,"tommybean@example.com",0894859612,EYR5DD,"TommyPass$321"`;

    // Parse and insert CSV data into UsersInfo table
    csvData.split("\n").forEach((line) => {
      if (line.trim()) {
        // Split by comma while respecting quotes
        const matches = line.match(/(".*?"|[^,\s]+)(?=\s*,|\s*$)/g);
        const values = matches.map((val) => val.replace(/^"|"$/g, "").trim());

        const [fullName, age, email, phone, eircode, password] = values;
        const [firstName, secondName] = fullName
          .split(",")
          .map((name) => name.trim());

        const insertQuery = `INSERT IGNORE INTO mysql_table 
          (first_name, second_name, email, age, phone, eircode, password) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`;

        connection.query(
          insertQuery,
          [firstName, secondName, email, age, phone, eircode, password],
          (err) => {
            if (err) {
              console.error("Error inserting sample user data:", err);
            } else {
              console.log("Sample user data inserted successfully");
            }
          }
        );
      }
    });

    const createTransactionsTable = `CREATE TABLE IF NOT EXISTS Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY, 
    Date DATE, 
    type VARCHAR(255), 
    Wallet VARCHAR(255), 
    Description VARCHAR(255), 
    Category VARCHAR(355), 
    Value DOUBLE
);`;

    connection.query(createTransactionsTable, function (err) {
      if (err) {
        console.error("Error creating transactions table");
      } else {
        console.log("Transactions Table Created");
      }
    });
  });
}

module.exports = { connection, initDB };
