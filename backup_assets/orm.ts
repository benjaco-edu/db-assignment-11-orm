import * as orm from '../src/orm';
export class Customer{
  static _id: string = "Customer_id";
  Customer_id: number; 
  name: string; 
  async getOrders() : Promise<Order[]>  { return orm.query("(Order|Customer_id="+this.Customer_id+")")   }
  static _refs: string[] = ["Order"]
}
export class Order{
  static _id: string = "Order_id";
  Order_id: number; 
  date: string; 
  total: number; 
  Customer_id : Number;
  async getCustomer() : Promise<Customer> { return orm.query("(Customer|Customer_id="+this.Customer_id+")")   }
  async getOrderLines() : Promise<OrderLine[]>  { return orm.query("(OrderLine|Order_id="+this.Order_id+")")   }
  static _refs: string[] = ["OrderLine"]
}
export class OrderLine{
  static _id: string = "OrderLine_id";
  OrderLine_id: number; 
  Order_id : Number;
  async getOrder() : Promise<Order> { return orm.query("(Order|Order_id="+this.Order_id+")")   }
  Product_id : Number;
  async getProduct() : Promise<Product> { return orm.query("(Product|Product_id="+this.Product_id+")")   }
  count: number; 
  total: number; 
  static _refs: string[] = []
}
export class Product{
  static _id: string = "Product_id";
  Product_id: number; 
  name: string; 
  price: number; 
  static _refs: string[] = []
}
