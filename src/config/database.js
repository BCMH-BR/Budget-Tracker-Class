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

    const createUserInfoTable = `CREATE TABLE IF NOT EXISTS UsersInfo (userInfo_id INT AUTO_INCREMENT PRIMARY KEY, user_name VARCHAR(255),second_name VARCHAR(255), email VARCHAR(255) UNIQUE, age INT, phone VARCHAR(15), eircode 
    VARCHAR(10), password VARCHAR(255))`;
    connection.query(createUserInfoTable, function (err) {
      if (err) {
        console.error("Error creating Users Info table");
        throw err;
      } else {
        console.log("Users Info Table Created");
      }
    });

    // const createUsersTable = CREATE TABLE IF NOT EXISTS Users(user_id INT AUTO_INCREMENT PRIMARY KEY,user_name VARCHAR(255));
    // connection.query(createUsersTable, function (err) {
    //   if (err) {
    //     console.error("Error creating Users table");
    //     throw err;
    //   } else {
    //     console.log("Users Table Created");
    //   }
    // });

    // const createTransactionTypeTable = CREATE TABLE IF NOT EXISTS TransactionType(type_id INT AUTO_INCREMENT PRIMARY KEY,type_name VARCHAR(255));;
    // connection.query(createTransactionTypeTable, function (err) {
    //   if (err) {
    //     console.error("Error creating Transactions Type table");
    //     throw err;
    //   } else {
    //     console.log("Transactions Table Created");
    //   }
    // });

    // const createCategoryTable = CREATE TABLE IF NOT EXISTS Categories(category_id INT AUTO_INCREMENT PRIMARY KEY,category_name VARCHAR(255),type_id INT,FOREIGN KEY (type_id) REFERENCES TransactionType (type_id));;
    // connection.query(createCategoryTable, function (err) {
    //   if (err) {
    //     console.error("Error creating Categories table");
    //     throw err;
    //   } else {
    //     console.log("Categories Table Created");
    //   }
    // });

    // const createWalletTable = ` CREATE TABLE IF NOT EXISTS Wallet(wallet_id INT PRIMARY KEY,wallet_name VARCHAR(255));`;
    // connection.query(createWalletTable, function (err) {
    //   if (err) {
    //     console.error("Error creating Wallet table");
    //     throw err;
    //   } else {
    //     console.log("Wallet Table Created");
    //   }
    // });

    // const createTransactionsTable = CREATE TABLE IF NOT EXISTS Transactions(transaction_id INT AUTO_INCREMENT PRIMARY KEY,type_id INT,FOREIGN KEY (type_id) REFERENCES TransactionType (type_id),category_id INT,FOREIGN KEY (category_id) REFERENCES Categories (category_id),transaction_description VARCHAR(255),amount DOUBLE,transaction_date DATE,wallet_id INT,FOREIGN KEY (wallet_id) REFERENCES Wallet (wallet_id),user_id INT,FOREIGN KEY (user_id) REFERENCES Users (user_id));;

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