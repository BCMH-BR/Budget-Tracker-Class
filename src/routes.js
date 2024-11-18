const express = require('express');
const connection = require('./connection/database');

const routes = express();

routes.get('/', function(req, res) {
    let sqlCreateDB = `CREATE DATABASE IF NOT EXISTS mysql_db;`;
    connection.query(sqlCreateDB, function(err) {
        if (err) {
            return res.status(500).send('Erro ao criar o banco de dados');
        }
        connection.query('USE mysql_db;', function(err) {
            if (err) {
                return res.status(500).send('Erro ao selecionar o banco de dados');
            }
            let sqlCreateUsersTable = `
                CREATE TABLE IF NOT EXISTS Users(
                    user_id INT AUTO_INCREMENT PRIMARY KEY,
                    user_name VARCHAR(255)
                );
            `;
            connection.query(sqlCreateUsersTable, function(err) {
                if (err) {
                    return res.status(500).send('Erro ao criar a tabela Users');
                }
                let sqlCreateTransactionTypeTable = `
                    CREATE TABLE IF NOT EXISTS TransactionType(
                        type_id INT AUTO_INCREMENT PRIMARY KEY,
                        type_name VARCHAR(255)
                    );
                `;
                connection.query(sqlCreateTransactionTypeTable, function(err) {
                    if (err) {
                        return res.status(500).send('Erro ao criar a tabela TransactionType');
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
                            return res.status(500).send('Erro ao criar a tabela Category');
                        }
                        let sqlCreateWalletTable = `
                            CREATE TABLE IF NOT EXISTS Wallet(
                                wallet_id INT PRIMARY KEY,
                                wallet_name VARCHAR(255)
                            );
                        `;
                        connection.query(sqlCreateWalletTable, function(err) {
                            if (err) {
                                return res.status(500).send('Erro ao criar a tabela Wallet');
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
                                    return res.status(500).send('Erro ao criar a tabela Transactions');
                                }

                                return res.send('Banco de dados e tabelas criadas com sucesso');
                            });
                        });
                    });
                });
            });
        });
    });
});

module.exports = routes;