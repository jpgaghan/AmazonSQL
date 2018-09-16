var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");
var { table } = require("table")

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
    supervisorPrompt();
});

function supervisorPrompt() {
    inquirer.prompt([
        {
            type: "list",
            name: "prompt",
            message: "Select an Operation",
            choices: ["View Product Sales by Department", "Create New Department"]
        },
    ]).then(function (order) {
        switch (order.prompt) {
            case `View Product Sales by Department`:
                productSales();
                break;
            case `Create New Department`:
                addDepartment();
                break;
        }
    })
}

function productSales() {
    var query = connection.query(
        `SELECT departments.department_id, products.department_name, departments.over_head_costs, SUM(products.product_sales) AS product_sales, SUM(products.product_sales) - departments.over_head_costs AS total_profit
        FROM products INNER JOIN departments
        ON products.department_name = departments.department_name
        GROUP BY departments.department_name;`,
        function (err, res) {
            resArray = [];
            deptArray = [];
            header = false;
            res.forEach(function (object) {
                if (header === false) {
                    for (var index in object) {
                        deptArray.push(index);
                    }
                    resArray.push(deptArray);
                    deptArray = [];
                    header = true;
                }
                for (var index in object) {
                    deptArray.push(object[index]);
                }
                resArray.push(deptArray);
                deptArray = [];
            });
            output = table(resArray);
            console.log(output);
        })
    connection.end();
};

function addDepartment() {
    inquirer.prompt([

        {
            type: "input",
            name: "deptName",
            message: "What's the new departments name?"
        },
        {
            type: "input",
            name: "overheadCost",
            message: "What is the over head costs associated with this department?"
        },
    ]).then(function (addition) {
        var post = { department_name: addition.deptName, over_head_costs: addition.overheadCost };
        var query = connection.query(
            `INSERT INTO departments SET ?`, post, function (error, results, fields) {
                connection.end();
            });
    });
};