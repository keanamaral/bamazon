# bamazon
Bamazon Storefront for the Customer, Manager and Supervisor: A Node and SQL application to create a product database and allow customer interaction through a CLI.

## Database
The initializing data and SQL schema is stored in an SQL database, seeded through the `bamazonStoreSchema.sql` file. 

It contains two tables: 
1. A `products` table listing the products for sale: Each product in the `product` table is listed with its `item_id` (auto-generated integer), `product_name` (string), `department_name` (string), `price` (integer), and `stock_quantity` (integer), `product_sales` (integer).

2. And a `departments` table listing the departments: Each department in the `department` table is listed with its `department_id` (auto-generated integer), `department_name` (string), and `department_cost` (integer).

## User Interface

There are 3 users of `Bamazon`: `The Customer. The Manager. The supervisor.`
1. `The Customer` interfaces with the program through the `bamazonCustomer.js` file.
2. `The Manager` interfaces with the program through the `bamazonManager.js` file.
3. `The Supervisor` interfaces with the program through the `bamazonSupervisor.js` file.

To get started, open any one of the files in a visual studio code window and run the code in the command prompt of that window by entering `node <filename>`

### The Customer Interface

The `bamazonCustomer.js` file runs the customer interface. The products available for purchase are listed using the [Inquirer package](https://www.npmjs.com/package/inquirer) and the program interfaces with the `bamazonStoreSchema.sql` database using the [mySQL package](https://www.npmjs.com/package/mysql). 

* The customer is shown a table of ALL the products available to buy including the price and the quantity in stock
* The customer is then prompted with a list of products to choose from
* After Selecting the product, the customer is prompted to enter a quantity
* After entering the quantity: 
    1. The item is added to the customer's `shopping cart`
    2. The customer is shown a printout of his `shopping cart`
    3. Bamazon's product database is updated to reflect the decrease in that product's quantity
* The customer is then given a choice to `Continue Shopping` or `Checkout`
* If the customer purchases another item, the `shopping cart` is updated and ALL the contents are printed out for the customer
* `NOTE`: if the customer attempts to place an order for a quantity more than what is available in stock, the order is cancelled with a message and then the customer can either `Continue Shopping` or `Checkout`
* `On Checkout`: 
    1. The customer is given a printout of his final `shopping cart` and order total.
    2. The products table of the bamazon database is updated to reflect the decreased `quantity` and the sale increases the value of the `product sales`.

### The Manager Interface

The `bamazonManager.js` file runs the manager interface.
* The manager is given 5 choices:
    1. View all the products available for sale
    2. View only products with low inventory (i.e. less than 15 units)
    3. Add mode quantity to any product
    4. Add a new product to the list of products available for sale
    5. Exit the manager menu

#### View Products For Sale
There are two commands for viewing available products. The `View products for sale` command will display all of the products available for purchase.

#### View Low Inventory
The `View low inventory` command will show all items with fewer than 15 units in stock.

#### Add to Inventory
To restock an item's inventory, the manager must select the `Add to inventory` command, choose the item to restock, and indicate the number of units to restock.

#### Add New Product
To add a new product to the list of available products, the manager must select the `Add new product` command and describe the product. They will be prompted for the name, department, price, and quantity of the new item.

### The Supervisor Interface
The `bamazonSupervisor.js` file runs the supervisor interface.
* The supervisor is given 3 choices:
    1. View Department Info
    2. View Sales By Department
    3. Add New Department

#### View Department Info
The `View Department Info` command will show the supervisor the list of Departments by IDs, Name and the Cost of each department.

#### View Sales By Department
The `View Sales By Department` command will show the supervisor a table listing each department in order of ID, along with the department name, the overhead costs, the amount made by sales of products in that department, and the total profit (the product sales with the overhead costs subtracted).

#### Add New Department
The supervisor can add a `New Department`, and must enter the `Department Name` and the `Department Cost` of the new department.

## Video Walkthroughs

* If you would like to see a demonstration of running the Customer interface, [click here for a youtube video rundown](https://www.youtube.com/watch?v=vPnRDJsMITk&t=11s)

* If you would like to see a demonstration of running the Manager interface, [click here for a youtube video rundown](https://www.youtube.com/watch?v=Qde-PEUXfk8)

* If you would like to see a demonstration of running the Supervisor interface, [click here for a youtube video rundown](https://www.youtube.com/watch?v=OBvXBy7DVU0)