import * as orm from './orm';
import {Customer, Order, OrderLine, Product} from "../orm";

orm.connect({host: "127.0.0.1", user: "foo", password: "bar", database: "MicroShop"});


(async function () {


    console.log("Customer return a collection of all Customers");
    let customers : Customer[] = await orm.query("Customer");
    console.log(customers);
    console.log("\n");

    console.log("Get orders by saying [returned object].getOrders()")
    for (let customer of customers) {
        console.log(customer.name);
        console.log(await customer.getOrders())
    }
    console.log("\n\n");

    console.log("Customer.name return a collection of all names of Customers");
    let names : string[] = await orm.query("Customer.name");
    console.log(names);
    console.log("\n\n");

    console.log("(Customer|name='Joe') return a collection of all Customers named Joe.");
    let joeCustomers : Customer[] = await orm.query("(Customer|name='Joe')");
    console.log(joeCustomers);
    console.log("\n\n");

    console.log("(Customer|name='Joe').Order return a collection of all Joe's orders");
    let joeOrders : Order[] = await orm.query("(Customer|name='Joe').Order");
    console.log(joeOrders);
    console.log("\n");

    console.log("And get the customer of the order");
    for (let order of joeOrders) {
        console.log(order.Order_id);
        console.log(await order.getCustomer())
    }
    console.log("\n\n");

    console.log("(Customer|name='Joe').Order.OrderLine.Product return a collection of all products in all of Joe's orders");
    let products : Product[] = await orm.query("(Customer|name='Joe').Order.OrderLine.Product");
    console.log(products);
    console.log("\n\n");

    console.log("(Order|total > 200).Customer.name");
    let bigCustomers : string[] = await orm.query("(Order|total > 200).Customer.name");
    console.log(bigCustomers);
    console.log("\n\n");

    console.log("JUST FOR FUN - (Order|total > 200 and date = '14 april 19').(Customer|name LIKE 'J%')");
    let specialCustomers = await orm.query("(Order|total > 200 or date = '14 april 19').(Customer|name LIKE 'J%')");
    console.log(specialCustomers);
    console.log("\n\n");

    // @ts-ignore
    process.exit(0);
})();