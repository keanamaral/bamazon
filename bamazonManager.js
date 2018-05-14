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
  startManager();
});

function startManager() {
  inquirer
    .prompt({
      name: "mChoice",
      type: "list",
      message: "\nWhat would you like to do today?",
      choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit Manager View"]
    })
    .then(function(answer) {
      var operator = answer.mChoice;
      console.log("\n\nManager choice is: " + operator);
      switch(operator) {
        case "View Products For Sale": viewProducts(); break;
        case "View Low Inventory": viewLowInventory(); break;
        case "Add to Inventory": addInventory(); break;
        case "Add New Product": addNewProduct(); break;
        case "Exit Manager View": exitMgr(); break;
        // Instructions displayed in terminal to the user
        default: console.log("\r\n" +"Select one of the following choices: "+"\r\n"+
        "1. View Products For Sale: Lists every available item" +"\r\n"+
        "2. View Low Inventory: Items with less than 5 units available for sale"+"\r\n"+
        "3. Add to Inventory: Manager can add more to inventory"+"\r\n"+
        "4. Add New Product: "+"\r\n"+
        "--------------------------------------");
        };
    });
}
//////////////////////////////////////////////////////////////////////////////////////
/////FUNCTIONS!!! viewProducts, viewLowInventory, addInventory, addNewProduct/////////
//////////////////////////////////////////////////////////////////////////////////////
function viewProducts(){
  console.log("\nView Every Avalailable Product in format:");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("'ItemID-->Product Description-->Department Name-->Price-->Product Quantity'\n");
    for (var i = 0; i < res.length; i++) {
      console.log("Item# " + res[i].item_id + "-->" + res[i].product_name 
      + "-->" + res[i].department_name + "-->" + res[i].price 
      + "-->" + res[i].stock_quantity);
    }
    // console.table("\nProducts Available:",[
    //   res
    // ])
  })
  setTimeout(function() { startManager(); }, 200);
};

function viewLowInventory(){
  var lowStock = 15;
  connection.query("SELECT * FROM products WHERE stock_quantity < ?",[lowStock], function(err, res) {
    if (err) throw err;
    console.log("\nView Low Inventory (Quantity is less than " + lowStock + " units) in format:");
    console.log("'ItemID-->Product Description-->Department Name-->Price-->Product Quantity'\n");
    for (var i = 0; i < res.length; i++) {
      console.log("Item# " + res[i].item_id + "-->" + res[i].product_name 
      + "-->" + res[i].department_name + "-->" + res[i].price 
      + "-->" + res[i].stock_quantity);
    }
  })
  setTimeout(function() { startManager(); }, 200);
};

function addInventory(){
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
  console.log("\nFrom List below select a Product to Add Inventory\n");
  inquirer
  .prompt([
    {
    name: "productName",
    type: "list",
    message: "\nPlease select a product you would like to purchase today:",
    choices: function() {
      var choiceArray = [];
      for (var i = 0; i < results.length; i++) {
        choiceArray.push(results[i].product_name);
      }
      return choiceArray;
      }
    },{
    name: "mInventory",
    type: "input",
    message: "\nPlease enter Quantity to add for this Product:",
      validate: function(value) {
        if (parseInt(value) > 0){return true} else {return false}
      }
    }
  ])
  .then(function(answer) {
    connection.query('SELECT * FROM products WHERE ?', { product_name: answer.productName }, function(err, res){
      if (err) throw err;

    console.log("Increasing quantity for " + answer.productName + " from " 
    + res[0].stock_quantity + " units by " + answer.mInventory + " units.");

    var newQuantity = parseInt(res[0].stock_quantity) + parseInt(answer.mInventory);

    connection.query("UPDATE products SET ? WHERE ?", 
    [{stock_quantity: newQuantity},{product_name: answer.productName}], function(err, res) {
        if (err) throw err;
        console.log("\n\n"+ res.affectedRows + " quantity updated in database!\n");
        setTimeout(function() { startManager(); }, 200);
      });
  });
  });
})
};

function addNewProduct(){
  console.log("\nYou will need to Select a Department and enter the following 3 pieces of information:" +
  "\nProduct Name, \nPrice to Sell to Customer and \nQuantity more than 0");
  connection.query("SELECT * FROM products GROUP BY department_name", function(err, results) {
    if (err) throw err;
  inquirer
  .prompt([
    {
    name: "deptName",
    type: "list",
    message: "\nPlease Select Department Name:",
    choices: function() {
      var choiceArray = [];
      for (var i = 0; i < results.length; i++) {
        choiceArray.push(results[i].department_name);
      }
      return choiceArray;
      }
    },{
      name: "productName",
      type: "input",
      message: "\nPlease enter Product Name:",
        validate: function(value) {
          if (value != ""){return true} else {return false}
        }
    },{
    name: "mPrice",
    type: "input",
    message: "\nPlease enter Price to sell to customer:",
      validate: function(value) {
        if (parseInt(value) > 0){return true} else {return false}
      }
    },{
    name: "mInventory",
    type: "input",
    message: "\nPlease enter Quantity for this Product:",
      validate: function(value) {
        if (parseInt(value) > 0){return true} else {return false}
      }
    }
  ])
  .then(function(answer) {
    connection.query("INSERT INTO products SET ?",
      {
        product_name: answer.productName,
        department_name: answer.deptName,
        price: answer.mPrice,
        stock_quantity: answer.mInventory
      },
      function(err, res) {
        if (err) throw err;
        console.log("\n\n"+ res.affectedRows + " product ADDED to database!\n");
        setTimeout(function() { startManager(); }, 200);
      });
  });
});
};

function exitMgr(){
  console.log("\nThank you for visiting Bamazon's Manager View\n\n");
  connection.end();
};