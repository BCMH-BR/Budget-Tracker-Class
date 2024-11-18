import connection from "./src/connection/database";

const express = require('express');


const routes = express();

routes.get('/', function(req, res) {
    let sql = "CREATE DATABASE IF NOT EXISTS mysql_db;\n" +
        "\n" +
        "USE mysql_db;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS Users(\n" +
        "\tuser_id INT AUTO_INCREMENT PRIMARY KEY,\n" +
        "    user_name VARCHAR(255)\n" +
        ");\n" +
        "\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS TransactionType(\n" +
        "\ttype_id INT AUTO_INCREMENT PRIMARY KEY,\n" +
        "    type_name VARCHAR(255)\n" +
        ");\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS Category(\n" +
        "\tcategory_id INT AUTO_INCREMENT PRIMARY KEY,\n" +
        "    category_name VARCHAR(255),\n" +
        "    type_id INT,\n" +
        "    FOREIGN KEY (type_id) references TransactionType (type_id)\n" +
        ");\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS Wallet(\n" +
        "\twallet_id INT PRIMARY KEY,\n" +
        "    wallet_name VARCHAR(255)\n" +
        ");\n" +
        "\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS Transactions(\n" +
        "\ttransaction_id INT AUTO_INCREMENT PRIMARY KEY,\n" +
        "    type_id INT,\n" +
        "\tFOREIGN KEY (type_id) references TransactionType (type_id),\n" +
        "    category_id INT,\n" +
        "    FOREIGN KEY (category_id ) references Category (category_id),\n" +
        "    transaction_description VARCHAR(255),\n" +
        "    amount double,\n" +
        "    transaction_date DATE,\n" +
        "    wallet_id INT,\n" +
        "    FOREIGN KEY (wallet_id) references Wallet (wallet_id),\n" +
        "    user_id INT,\n" +
        "    FOREIGN KEY (user_id) references Users (user_id)\n" +
        "    \n" +
        "    \n" +
        ");"
    connection.query(sql, function(err, results){
        if (err) throw err;
        res.send(results);
    })
})


module.exports = routes;





