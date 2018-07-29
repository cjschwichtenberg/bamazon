const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "passphrase",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    productTable();
});

function productTable() {
    console.log("\n--------------")
    console.log("\nYou've reached BAMAZON! View product offerings at this time below...")
    console.log("----------------\n")
    connection.query("SELECT * from products", function (err, res) {
        var productArray = [];
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            productArray.push(res[i]);
        }
        // console.log(productArray);
        console.table(res);
        shoppingCartID();
    });
}

function shoppingCartID() {
    
    inquirer.prompt([
        {
        type: "input",
        name: "shoppingCart",
        message: "What productID would you like to add to your shopping cart?"
        }
    ]).then(function(answer) {
        connection.query("SELECT * from products", function (err, res) {
            var productID = [];
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                productID.push(res[i].ID);
            }
            console.log(productId)
        })
        if(productID.indexof() === -1) {
            console.log("Please enter a valid product ID!")
            break;
            shoppingCartID();
        }else if (isNaN(answer)) {
            console.log("INVALID ENTRY. Please enter the items ID number.")
        }else
    
    }

}