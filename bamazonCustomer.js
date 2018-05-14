var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("cli-table");

//for printing shopping cart array and updating database
var shoppingCart = [];
function userPurchase(productid, product, quantity, price, total) {
  this.productid = productid;
  this.product = product;
  this.quantity = quantity;
  this.price = price;
  this.total = total;
};
userPurchase.prototype.printInfo = function() {
  console.log("Product ID: " + this.productid + "\nProduct Purchased: " + this.product +
  "\nQty Ordered: " + this.quantity + "\nPrice/unit: " + this.price +
  "\nOrder Total: " + this.total);
  console.log("---------------");
};

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
  console.log("\nWelcome to your Bamazon Store\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("\nHere is what is available to buy:\n");
    for (var i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name 
      + " || Department: " + res[i].department_name + " || Price: " + res[i].price 
      + " || Stock: " + res[i].stock_quantity);
    }
  purchase();
  })
};

function purchase() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
        name: "productPurchase",
        type: "list",
        message: "\nPlease select a product you would like to purchase today:",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].product_name);
          }
          // choiceArray.push("exitStore");
          return choiceArray;
          }
        },{
          name: "qtyPurchase",
          type: "input",
          message: "\nPlease enter quantity you would like to purchase:",
          validate: function(value) {
            if (parseInt(value) > 0){return true} else {return false}
          }
        }
      ])
      .then(function(answer) {
        connection.query('SELECT * FROM products WHERE ?', { product_name: answer.productPurchase }, function(err, res){
          if (err) throw err;
          // console.log(res);
          // console.log(res[0].stock_quantity)
          if(answer.qtyPurchase < res[0].stock_quantity){
            console.log("\nWe currently have " + res[0].stock_quantity + " " + res[0].product_name + ".");
            console.log("Your order of "+ answer.qtyPurchase + " " + answer.productPurchase + " is now added to your shopping cart.\n");
                //now adding purchase to customer's shopping cart
                var pqty = answer.qtyPurchase * res[0].price
                // console.log(pqty);
                var newPurchase = new userPurchase(
                  res[0].item_id,
                  res[0].product_name,
                  answer.qtyPurchase,
                  res[0].price,
                  pqty);
                // console.log(newPurchase);
                shoppingCart.push(newPurchase);
                // console.log("Shopping Cart: " + shoppingCart);
                console.log("PRINTING SHOPPING CART\n"+"-------------------");
                for (var x = 0; x < shoppingCart.length; x++) {
                  shoppingCart[x].printInfo();
                }
                //Updating Database:
                console.log("\nUpdating Bamazon product quantities...\n");
                var nStockQty = res[0].stock_quantity - answer.qtyPurchase;
                var nProdSales = res[0].product_sales + (res[0].price * answer.qtyPurchase)
                var nItemID = res[0].item_id
                console.log("For Item ID: " + nItemID + "   Product: " + res[0].product_name + 
                "\nNew stock quantity: " + nStockQty + "\nNew Product Sales: " + nProdSales);

                connection.query("UPDATE products SET stock_quantity=?, product_sales=? WHERE item_id=?",
                [nStockQty,nProdSales,nItemID], function(err, res) {
                  if (err) throw err;
                  console.log("\n\n"+ res.affectedRows + " product updated!\n");
                  console.log("PRESS up or down arrow key to continue");
                });
          } else {
            console.log("\nNot enough " + res[0].product_name + " in stock.  Order not processed.");
            console.log("You requested: " + answer.qtyPurchase + ", but we only have " + res[0].stock_quantity + " in stock.\n")
          }
        });
        nextStep();
      });
  });
}

function nextStep() {
    inquirer
      .prompt([
        {
          name: "nextStep",
          type: "list",
          message: "\nWhat would you like to do next?",
          choices: ["Continue Shopping", "Checkout"]
        }
      ])
      .then(function(answer) {
        if(answer.nextStep === "Continue Shopping"){purchase()} else {checkout()};
      });
}

function checkout(){
  var orderTotal = 0;
  console.log("\nThank you for your patronage.\n" + shoppingCart.length +  
  " items ordered on this shopping experience.\nOrdered items are:\n"+"-------------------");
  for (var x = 0; x < shoppingCart.length; x++) {
    shoppingCart[x].printInfo();
    orderTotal += shoppingCart[x].total;
  }
  console.log("\nYour "+ shoppingCart.length + " checked-out items, order total: " + orderTotal + 
  " has been charged to your account.\nPlease come back soon.\n\n");
  connection.end();
  shoppingCart = [];
}