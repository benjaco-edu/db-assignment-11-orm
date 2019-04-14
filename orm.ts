export class Customer{
  static _id: string = "Customer_id";
  Customer_id: number; 
  name: string; 
  async getOrders() /*: Promise<Order[]> */ { throw new Error("Not implemented")  }
  static _refs: string[] = ["Order"]
}
export class Order{
  static _id: string = "Order_id";
  Order_id: number; 
  date: string; 
  total: number; 
  Customer_id : Number;
  async getCustomer() /*: Promise<Customer>*/ { throw new Error("Not implemented")  }
  async getOrderLines() /*: Promise<OrderLine[]> */ { throw new Error("Not implemented")  }
  static _refs: string[] = ["OrderLine"]
}
export class OrderLine{
  static _id: string = "OrderLine_id";
  OrderLine_id: number; 
  Order_id : Number;
  async getOrder() /*: Promise<Order>*/ { throw new Error("Not implemented")  }
  Product_id : Number;
  async getProduct() /*: Promise<Product>*/ { throw new Error("Not implemented")  }
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
