var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  startSupervisor();
});

function startSupervisor() {
  inquirer
    .prompt({
      name: "sChoice",
      type: "list",
      message: "\nWhat would you like to do today?",
      choices: ["View Department Info", "View Sales By Department", "Add New Department", "Exit Supervisor View"]
    })
    .then(function(answer) {
      var operator = answer.sChoice;
      console.log("\n\nSupervisor choice is: " + operator);
      switch(operator) {
        case "View Department Info": viewDeptInfo(); break;
        case "View Sales By Department": viewDeptSales(); break;
        case "Add New Department": addNewDept(); break;
        case "Exit Supervisor View": exitSupervisor(); break;
        // Instructions displayed in terminal to the user
        default: console.log("\r\n" +"Select one of the following choices: "+"\r\n"+
        "1. View Department Info: Shows Supervisor Department Database" +"\r\n"+
        "2. View Sales By Department: Shows Supervisor the Sales by Department and Profitability" +"\r\n"+
        "3. Add New Department: Adds New Department with a new product"+"\r\n"+
        "--------------------------------------");
        };
    });
}

//////////////////////////////////////////////////////////////////////////////////////
/////FUNCTIONS!!! viewDeptInfo, viewDeptSales, addNewDept, Exit///////////////////////
//////////////////////////////////////////////////////////////////////////////////////

function viewDeptInfo(){
  console.log("\nView Department Information in format:");
  connection.query("SELECT * FROM departments", function(err, res) {
    if (err) throw err;
    console.log("'DepartmentID-->Deparment Name-->Department Cost'\n");
    for (var i = 0; i < res.length; i++) {
      console.log("Dept# "+ res[i].department_id + "-->" + res[i].department_name + "-->" + res[i].department_cost);
    }
  })
  setTimeout(function() { startSupervisor(); }, 200);
}

function viewDeptSales(){
  console.log("\nView Department Profitability in format:");
  connection.query("SELECT d.department_id, d.department_name, d.department_cost, sum(p.product_sales) as deptProd_sales, (p.product_sales - d.department_cost) AS total_profit\
  FROM departments AS d INNER JOIN products AS p ON d.department_name = p.department_name GROUP BY p.department_name ORDER BY d.department_id", function(err, res) {
    if (err) throw err;
        
        console.log("'DepartmentID-->Deparment Name-->Department Cost-->Department Product Sales-->Department Total/Net Profit'\n");
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
          console.log("Dept# "+ res[i].department_id + "-->" + res[i].department_name + "-->" + res[i].department_cost 
          + "-->"+ res[i].deptProd_sales + "-->"+ res[i].total_profit);
        }
  })
  setTimeout(function() { startSupervisor(); }, 200);
}

function addNewDept(){
  console.log("\nYou will need to enter the following 2 pieces of information:" +
  "\nDepartment Name, and \nDepartment Cost more than 0");
  connection.query("SELECT * FROM departments", function(err, results) {
    if (err) throw err;
  inquirer
  .prompt([
    {
      name: "deptName",
      type: "input",
      message: "\nPlease enter a NEW Department Name:",
        validate: function(value) {
          if (value != ""){return true} else {return false}
        }
    },{
    name: "deptCost",
    type: "input",
    message: "\nPlease enter the associated new Department's Cost:",
      validate: function(value) {
        if (parseInt(value) > 0){return true} else {return false}
      }
    }
  ])
  .then(function(answer) {
    connection.query("INSERT INTO departments SET ?",
      {
        department_name: answer.deptName,
        department_cost: answer.deptCost,
      },
      function(err, res) {
        if (err) throw err;
        console.log("\n\n"+ res.affectedRows + " product ADDED to database!\n");
        setTimeout(function() { startSupervisor(); }, 200);
      });
  });
});
}
function exitSupervisor(){
  console.log("\nThank you for visiting Bamazon's Supervisor View\n\n");
  connection.end();
}