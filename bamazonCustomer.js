const dotenv = require("dotenv").config();
console.log(dotenv);

const keys = require('./keys.js');

const mysql = require("mysql");

const inquirer = require("inquirer");

const cTable = require('console.table');

var productArray = [];

let totalPrice = 0;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: keys.mysql.password,
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    productTable();
});



function productTable(initial = true) {
    
    console.log("\n--------------")
    console.log("\nYou've reached BAMAZON! View our product offerings at this time below...")
    console.log("----------------\n")
    
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            productArray.push(res[i]);
        }
        if (initial) console.table(res);
        // console.log(productArray);
        purchaseProduct();
    });
}



function purchaseProduct(productArrayID) {

    var productArrayID = [];
    
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            productArrayID.push(res[i].ID);
        }
        console.log("\n--------------")
        console.log(productArrayID);
        console.log("---------------\n")
    });
    
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Please enter the product ID number from the list below that you would like to add to your shopping cart...",
            choices: productArrayID,
            validate: function(value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number
        },
        {
            type: "input",
            name: "quantity",
            message: "Please enter the quantity you would like to add to your shopping cart?",
            validate: function(value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number
        }
    ])
    .then(answers => {
        var shoppingCartID = answers.id;
        // console.log(shoppingCartID);

        var shoppingCartQuantity = answers.quantity;
        // console.log(shoppingCartQuantity);

        var queryStr = "SELECT * FROM products WHERE ID = " + shoppingCartID;
        

        // 1st attempt at extracting Row Data Packet...
        // connection.query(queryStr, { ID: shoppingCartID }, function(err, data) {
        //     if (err) throw err;
        //     var productData = data[0];
        //     console.log("Sold Product Info: " + productData);


        // 2nd attempt- can console.log object but still getting undefined when consoling 'stockQuantity'
        connection.query("SELECT * FROM products WHERE ID = " + shoppingCartID, function(err, res) {
            if (err) throw err;

            // CODE TO VIEW JSON OBJECT IN CONSOLE.LOG
            // var soldProductOBJ = JSON.stringify(res[0]);
            // console.log("Stringify: " + soldProductOBJ);

            soldProductOBJ = JSON.parse(JSON.stringify(res[0]));
            var stockQuantity = soldProductOBJ.StockQuantity;
            console.log("Stock Quantity: " + stockQuantity);
        
            // 3rd attempt;
            // var stockQuantity = soldProductOBJ[0].StockQuantity;
            
            // 4th attempt
            // var stockQuantity = soldProductOBJ.["StockQuantity"]

        // 5th attempt:
        // Shows MySQL Database Table Data (Array of Objects)... i.e. rows
        // connection.query("SELECT * FROM products", function (err, result, fields) {
        //     // if any error while executing above query, throw error
        //     if (err) throw err;
        //     // if there is no error, you have the result
        //     // iterate for all the rows in result
        //     Object.keys(result).forEach(function(key) {
        //         var row = result[key];
        //         console.log(row);
        //     //   console.log(row.StockQuantity);
        //     });

        // 6th attempt:
        // Shows MySQL Database Table Data (Stats)... i.e. fields
        // connection.query("SELECT * FROM products", function (err, result, fields) {
        //     if (err) throw err;
        //     Object.keys(fields).forEach(function(key) {
        //         var field = fields[key];
        //         console.log(field)
        //     });
            
            if (shoppingCartQuantity > stockQuantity) {
                console.log("Opps! Unfortunately we are running low on your selected items stock. Please update your shopping cart quantity.");
                productTable(false);
            } else if (shoppingCartQuantity <= stockQuantity) {
                var newStockQuantity = stockQuantity - shoppingCartQuantity;
                console.log(newStockQuantity);
                function updateQuantity() {
                    console.log("Updating quantity...\n");
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                StockQuantity: newStockQuantity
                            },
                            {
                                ID: shoppingCartID
                            }   
                        ],
                        function(err, res) {
                            console.log(res.affectedRows + " products updated!\n");
                        }
                    );
                } 
                updateQuantity();
                var price = soldProductOBJ.Price;
                console.log('Price: $ ' + price + " each");
                totalPrice += shoppingCartQuantity * soldProductOBJ.Price;
                console.log("Your shopping cart total is: $ " + totalPrice)
                inquirer.prompt([
                    {
                        type: "list",
                        name: "continueShopping",
                        message: "Would you like to add another item to your shopping cart?",
                        choices: ["YES", "NO"],
                        filter: function(val) {
                            return val.toUpperCase();
                            
                        },
                    }
                ])
                .then(answer => {
                    if (answer.continueShopping === "YES") {
                        connection.query("SELECT * FROM products", function (err, res) {
                            if (err) throw err;
                            for (i = 0; i < res.length; i++) {
                                productArray.push(res[i]);
                            }
                            console.table(res);
                            productTable(false);
                        });
                    }else if (answer.continueShopping === "NO") {
                        console.log("Thank you for your purchase. You total today is: $ " + totalPrice);
                        connection.end();
                   }
                })
            }
        });
    })
}


