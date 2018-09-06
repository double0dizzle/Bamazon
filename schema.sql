DROP DATABASE IF EXISTS bamazondb;
CREATE DATABASE bamazondb;
USE bamazondb;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NULL,
department_name VARCHAR(50) NULL,
price INT NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id) 
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dippy Chew Chew", "Liquor", 5, 16), ("Camel Lights", "Cigarettes", 5, 1400), ("Jack Daniels", "Liquor", 20, 4), ("Super Tent", "Outdoors", 120, 2), ("Maximum Hunter", "Magazines", 8, 3), ("Glow Worm", "Toys", 25, 10), ("PS4", "Electronics", 300, 12), ("Oakleys", "Sunglasses", 400, 6), ("Fire and Fury", "Books", 18, 32), ("Easton 32in Alum", "Sports", 40, 14);

SELECT * FROM products;