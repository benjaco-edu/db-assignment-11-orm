import * as orm from './orm';

orm.connect({host: "127.0.0.1", user: "foo", password: "bar", database: "MicroShop"});


(async function () {
    let data;

    console.log("Customer return a collection of all Customers");
    data = await orm.query("Customer");
    console.log(data);
    console.log("\n\n");

    console.log("Customer.name return a collection of all names of Customers");
    data = await orm.query("Customer.name");
    console.log(data);
    console.log("\n\n");

    console.log("(Customer|name='Joe') return a collection of all Customers named Joe.");
    data = await orm.query("(Customer|name='Joe')");
    console.log(data);
    console.log("\n\n");

    console.log("(Customer|name='Joe').Order return a collection of all Joe's orders");
    data = await orm.query("(Customer|name='Joe').Order");
    console.log(data);
    console.log("\n\n");

    console.log("(Customer|name='Joe').Order.OrderLine.Product return a collection of all products in all of Joe's orders");
    data = await orm.query("(Customer|name='Joe').Order.OrderLine.Product");
    console.log(data);
    console.log("\n\n");

    console.log("(Order|total > 200).Customer.name");
    data = await orm.query("(Order|total > 200).Customer.name");
    console.log(data);
    console.log("\n\n");

    console.log("JUST FOR FUN - (Order|total > 200 and date = '14 april 19').(Customer|name='Joe') ");
    data = await orm.query("(Order|total > 200 or date = '14 april 19').(Customer|name='Joe')");
    console.log(data);
    console.log("\n\n");

    process.exit(0);
})();