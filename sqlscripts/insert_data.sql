
insert into Customer (Customer_id, name) VALUES (1, "Joe");
insert into Customer (Customer_id, name) VALUES (2, "Jane");
insert into Customer (Customer_id, name) VALUES (3, "Alica");
insert into Product (Product_id, name, price) VALUES (1, "LED strip", 25);
insert into Product (Product_id, name, price) VALUES (2, "LED controllor", 25);
insert into Product (Product_id, name, price) VALUES (3, "RGB Bulb", 25);
insert into Product (Product_id, name, price) VALUES (4, "10m power cord", 25);

insert into `Order` (Order_id,date, total, Customer_id) values (1, "12 april 19", 100, 1);
insert into OrderLine (Order_id, Product_id, count, total) values (1, 1, 4, 100);

insert into `Order` (Order_id,date, total, Customer_id) values (2, "14 april 19", 250, 1);
insert into OrderLine (Order_id, Product_id, count, total) values (2, 2, 9, 225);
insert into OrderLine (Order_id, Product_id, count, total) values (2, 3, 1, 25);

insert into `Order` (Order_id,date, total, Customer_id) values (3, "13 april 19", 100, 2);
insert into OrderLine (Order_id, Product_id, count, total) values (3, 4, 4, 100);

insert into `Order` (Order_id,date, total, Customer_id) values (4, "14 april 19", 250, 3);
insert into OrderLine (Order_id, Product_id, count, total) values (4, 4, 10, 250);
