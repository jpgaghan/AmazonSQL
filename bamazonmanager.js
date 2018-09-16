var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    managerPrompt();
});

function managerPrompt() {
    inquirer.prompt([
        {
            type: "list",
            name: "prompt",
            message: "Select an Operation",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        },
    ]).then(function (order) {
        switch (order.prompt) {
            case `View Products for Sale`:
                queryDatabase();
                break;
            case `View Low Inventory`:
                querylowInventory();
                break;
            case `Add to Inventory`:
                addInventory();
                break;
            case `Add New Product`:
                addProduct();
                break;
        }
    })
};

function queryDatabase() {
    var query = connection.query(
        "SELECT * FROM products",
        function (err, res) {
            res.forEach(function (index) {
                console.log(`Product ID: ${chalk.red(index.item_id)} Product Name: ${chalk.green(index.product_name)} Price: ${chalk.blue(index.price)} Stock: ${chalk.blue(index.stock_quantity)}`);
            });
        })
};

function querylowInventory() {
    var query = connection.query(
        "SELECT * FROM products WHERE stock_quantity <=5",
        function (err, res) {
            res.forEach(function (index) {
                console.log(`Product ID: ${chalk.red(index.item_id)} Product Name: ${chalk.green(index.product_name)} Price: ${chalk.blue(index.price)} Stock: ${chalk.blue(index.stock_quantity)}`);
            });
        })
    connection.end();
};

function addInventory() {
    inquirer.prompt([

        {
            type: "input",
            name: "productId",
            message: "Input product ID you would like to increase stock on."
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to add to your stock?"
        },
    ]).then(function (order) {
        var addQuantity = order.quantity;
        var itemid = order.productId;
        var query = connection.query(
            `SELECT stock_quantity FROM products WHERE ?`,
            [
                {
                    item_id: itemid
                }
            ],
            function (error, results, field) {
                console.log(results)
                var currentQuantity = results[0].stock_quantity
                var query = connection.query(
                    `UPDATE products SET ? WHERE ?`,
                    [
                        {
                            stock_quantity: parseInt(currentQuantity) + parseInt(addQuantity)
                        },
                        {
                            item_id: itemid
                        }
                    ],
                    function (error, results) {
                        console.log(`${results.affectedRows}`)
                        connection.end();
                    }
                )
            })
    })
}

function addProduct() {
    inquirer.prompt([

        {
            type: "input",
            name: "prodName",
            message: "What's the new products name?"
        },
        {
            type: "input",
            name: "prodPrice",
            message: "How much does it cost per unit?"
        },
        {
            type: "input",
            name: "prodDept",
            message: "What department does it belong in?"
        },
        {
            type: "input",
            name: "prodQuant",
            message: "How many are you stocking?"
        },
    ]).then(function (addition) {
        var post = { product_name: addition.prodName, price: parseFloat(addition.prodPrice).toFixed(2), department_name: addition.prodDept, stock_quantity: parseInt(addition.prodQuant) };
        var query = connection.query(
            `INSERT INTO products SET ?`, post, function (error, results, fields) {
                connection.end();
            });
    });
}