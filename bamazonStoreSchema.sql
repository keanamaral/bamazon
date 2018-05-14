DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  product_sales INT default 0,
  PRIMARY KEY (item_id)
);

USE bamazon_DB;
CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  department_cost INT default 0,
  PRIMARY KEY (department_id)
);

/*initialize tables products and departments with some initial data*/
USE bamazon_DB;
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("kindle", "books",50,200,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("MagnoliaTable", "books",15,200,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("xbox", "videogames",200,80,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("playstation", "videogames",200,80,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("iphone", "phone",400,40,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("SamsungNote8", "phone",350,50,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("I-Buy-Power", "computer",2000,15,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("MacBookPro", "computer",1500,15,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Nvidia1080TI", "computer",1200,10,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("SleevelessScoopNeck", "WClothing",100,100,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("VintageTeaDress", "WClothing",120,100,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("HighWaistYogaPants", "WClothing",90,120,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Sony50in", "TV",900,12,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Samsung55in", "TV",850,12,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Armoire", "Furniture",500,10,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Armchair", "Furniture",150,12,0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("AmazingCouch", "Furniture",200,12,0);

USE bamazon_DB;
INSERT INTO departments (department_name, department_cost)
VALUES ("books",1000);
INSERT INTO departments (department_name, department_cost)
VALUES ("videogames",2000);
INSERT INTO departments (department_name, department_cost)
VALUES ("phone",5000);
INSERT INTO departments (department_name, department_cost)
VALUES ("computer",10000);
INSERT INTO departments (department_name, department_cost)
VALUES ("WClothing",2000);
INSERT INTO departments (department_name, department_cost)
VALUES ("TV",10000);
INSERT INTO departments (department_name, department_cost)
VALUES ("Furniture",2000);