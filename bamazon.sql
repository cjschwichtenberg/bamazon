DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;


CREATE TABLE products(
		ID INTEGER NOT NULL AUTO_INCREMENT,
		ProductName VARCHAR(35) NOT NULL,
		DepartmentName VARCHAR(35) NOT NULL,
        Color VARCHAR(35) NOT NULL,
		Price DECIMAL(8,2)  NOT NULL DEFAULT 0.00,
		StockQuantity INTEGER(35) NOT NULL DEFAULT 0,
		PRIMARY KEY (id)
);

INSERT INTO products (ID, ProductName, DepartmentName, Color, Price, StockQuantity)
VALUES (0, "purse", "accesories", "black-leather", 245.50, 5);

INSERT INTO products (ID, ProductName, DepartmentName, Color, Price, StockQuantity)
VALUES (0, "sunglasses", "accesories", "gold-aviator", 15.99, 35);

INSERT INTO products (ID, ProductName, DepartmentName, Color, Price, StockQuantity)
VALUES (0, "socks", "shoes", "grey-wool", 11.99, 20);

INSERT INTO products (ID, ProductName, DepartmentName, Color, Price, StockQuantity)
VALUES (0, "halter dress", "ladies", "multi", 55.99, 5);

INSERT INTO products (ID, ProductName, DepartmentName, Color, Price, StockQuantity)
VALUES (0, "long dress", "ladies", "black-knit", 89.50, 7);

INSERT INTO products (ID, ProductName, DepartmentName, Color, Price, StockQuantity)
VALUES (0, "belt", "accesories", "brown-leather", 60.89, 12);

INSERT INTO products (ID, ProductName, DepartmentName, Color, Price, StockQuantity)
VALUES (0, "t-shirt", "ladies", "white-studded", 55.50, 8);

INSERT INTO products (ID, ProductName, DepartmentName, Color, Price, StockQuantity)
VALUES (0, "purse", "accesories", "brown-leather", 245.99, 5);

INSERT INTO products (ID, ProductName, DepartmentName, Color, Price, StockQuantity)
VALUES (0, "booties", "shoes", "blk-leather", 259.99, 10);

INSERT INTO products (ID, ProductName, DepartmentName, Color, Price, StockQuantity)
VALUES (0, "boots-calf", "shoes", "brown-leather", 349.99, 5);

INSERT INTO products (ID, ProductName, DepartmentName, Color, Price, StockQuantity)
VALUES (0, "boots-knee", "shoes", "red-leather", 349.99, 5);

SELECT * FROM products;
