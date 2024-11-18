const express = require('express');
const connection = require('./connection/database');

const routes = express();

routes.get('/', function(req, res) {
    let sqlCreateDB = `CREATE DATABASE IF NOT EXISTS mysql_db;`;//NAO FUNCIONA - TEM QUE CRIAR MANUALMENTE A DB
    connection.query(sqlCreateDB, function(err) {
        if (err) {
            return res.status(500).send('Error creating database');
        }
        connection.query('USE mysql_db;', function(err) {
            if (err) {
                return res.status(500).send('Error selecting database');
            }
            let sqlCreateUsersTable = `
                CREATE TABLE IF NOT EXISTS Users(
                    user_id INT AUTO_INCREMENT PRIMARY KEY,
                    user_name VARCHAR(255)
                );
            `;
            connection.query(sqlCreateUsersTable, function(err) {
                if (err) {
                    return res.status(500).send('Error creating users table');
                }
                let sqlCreateTransactionTypeTable = `
                    CREATE TABLE IF NOT EXISTS TransactionType(
                        type_id INT AUTO_INCREMENT PRIMARY KEY,
                        type_name VARCHAR(255)
                    );
                `;
                connection.query(sqlCreateTransactionTypeTable, function(err) {
                    if (err) {
                        return res.status(500).send('Error creating TransactionsType table');
                    }
                    let sqlCreateCategoryTable = `
                        CREATE TABLE IF NOT EXISTS Category(
                            category_id INT AUTO_INCREMENT PRIMARY KEY,
                            category_name VARCHAR(255),
                            type_id INT,
                            FOREIGN KEY (type_id) REFERENCES TransactionType (type_id)
                        );
                    `;
                    connection.query(sqlCreateCategoryTable, function(err) {
                        if (err) {
                            return res.status(500).send('Error creating Category table');
                        }
                        let sqlCreateWalletTable = `
                            CREATE TABLE IF NOT EXISTS Wallet(
                                wallet_id INT PRIMARY KEY,
                                wallet_name VARCHAR(255)
                            );
                        `;
                        connection.query(sqlCreateWalletTable, function(err) {
                            if (err) {
                                return res.status(500).send('Error creating Wallet Table');
                            }
                            let sqlCreateTransactionsTable = `
                                CREATE TABLE IF NOT EXISTS Transactions(
                                    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
                                    type_id INT,
                                    FOREIGN KEY (type_id) REFERENCES TransactionType (type_id),
                                    category_id INT,
                                    FOREIGN KEY (category_id) REFERENCES Category (category_id),
                                    transaction_description VARCHAR(255),
                                    amount DOUBLE,
                                    transaction_date DATE,
                                    wallet_id INT,
                                    FOREIGN KEY (wallet_id) REFERENCES Wallet (wallet_id),
                                    user_id INT,
                                    FOREIGN KEY (user_id) REFERENCES Users (user_id)
                                );
                            `;
                            connection.query(sqlCreateTransactionsTable, function(err, results) {
                                if (err) {
                                    return res.status(500).send('Error creating Transaction Table');
                                }

                                return res.send('Database and Tables were sucessfully created');
                            });
                        });
                    });
                });
            });
        });
    });
});

module.exports = routes;