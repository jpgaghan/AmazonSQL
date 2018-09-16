var mysql = require("mysql");
var inquirer = require("inquirer")
var chalk = require("chalk")

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

connection.connect(function(err) {
  if (err) throw err;
  queryDatabase();
});

function queryDatabase() {
  var query = connection.query(
    "SELECT * FROM products",
    function(err, res) {
      res.forEach(function (index) {
        console.log(`Product ID: ${chalk.red(index.item_id)} Product Name: ${chalk.green(index.product_name)} Price: ${chalk.blue(index.price)} Stock: ${chalk.blue(index.stock_quantity)}`);
    });
      orderPrompt();
    }
  );
}

function orderPrompt() {
  inquirer.prompt([

  {
    type: "input",
    name: "productId",
    message: "Input product ID you would like to purchase."
  },
  {
    type: "input",
    name: "quantity",
    message: "How many would you like to purchase?"
  },
]).then(function(order) {
  var orderQuantity = order.quantity;
  var itemid = order.productId;
  var query = connection.query(
      `SELECT * FROM products WHERE ?`,
    [
      {
        item_id: itemid
      }
    ],
     function(error, results) {
       var unitPrice = results[0].price;
      if (orderQuantity <= results[0].stock_quantity) {
        var query = connection.query(
            `UPDATE products SET ? Where ?`,
          [
            {
              stock_quantity: results[0].stock_quantity - orderQuantity,
              product_sales: parseFloat(results[0].product_sales) + parseFloat(unitPrice*orderQuantity) 
            },
            {
              item_id: itemid
            }
          ],
          function(error, results) {
            console.log(`Your orders total cost is ${unitPrice*orderQuantity}`)
            connection.end();
      })} else {console.log('Insufficient Quantity!')
      connection.end();}
    });
});
}