CREATE DATABASE `MicroShop`;
USE `MicroShop`;
CREATE TABLE `Customer` (
  `Customer_id` INT AUTO_INCREMENT,
  `name` TEXT, 
  PRIMARY KEY (`Customer_id`)
);
CREATE TABLE `Order` (
  `Order_id` INT AUTO_INCREMENT,
  `date` TEXT, 
  `total` INT, 
  `Customer_id` INT, 
  PRIMARY KEY (`Order_id`)
);
CREATE TABLE `OrderLine` (
  `OrderLine_id` INT AUTO_INCREMENT,
  `Order_id` INT, 
  `Product_id` INT, 
  `count` INT, 
  `total` INT, 
  PRIMARY KEY (`OrderLine_id`)
);
CREATE TABLE `Product` (
  `Product_id` INT AUTO_INCREMENT,
  `name` TEXT, 
  `price` INT, 
  PRIMARY KEY (`Product_id`)
);
