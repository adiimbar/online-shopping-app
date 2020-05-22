let connection = require("./connection-wrapper");

async function getAllOrders() {
  let sql = "SELECT * FROM orders";
  let orders = await connection.execute(sql);
  console.log(orders);
  return orders;
}

async function getAllUserOrders(userId) {
  let sql = "SELECT * FROM orders WHERE user_id=?";
  let parameters = [userId];
  let order = await connection.executeWithParameters(sql, parameters);
  console.log(order);
  return order;
}

// dose not include details on items - only on total price
async function addOrder(order) {
  let sql = 'INSERT INTO orders (user_id, cart_id, total_price, shipping_city, shipping_street, shipping_date, order_timestamp, last_4_credit_digits) VALUES (?,?,?,?,?,?,CURRENT_TIMESTAMP,?)';
  let parameters = [order.userId, order.cartId, order.totalPrice, order.city, order.street, order.shippingDate, order.creditCard];
  await connection.executeWithParameters(sql, parameters);
}

async function updateOrder(order) {
  let sql = 'UPDATE orders SET cart_id=?, total_price=?, shipping_city=?, shipping_street=?, shipping_date=?, last_4_credit_digits=? WHERE order_id=?';
  let parameters = [order.cartId, order.totalPrice, order.shipping_City, order.shipping_Street, order.deliveryDate, order.last_4_credit_digits, order.orderId];
  await connection.executeWithParameters(sql, parameters);
}

async function updateOrderStatus(order) {
  let sql = 'UPDATE orders SET status=? WHERE order_id=?';
  let parameters = [order.status, order.orderId];
  await connection.executeWithParameters(sql, parameters);
}


// not sure if it should be available
async function deleteOrder(orderId) {
  let sql = "DELETE FROM orders where order_id=?";
  let parameters = orderId;
  let deleteResponce = await connection.executeWithParameters(sql, parameters);
  return deleteResponce;
}


async function getNumberOfOrders() {
  let sql = "SELECT COUNT(order_id) AS numOfOrders FROM orders";
  let orders = await connection.execute(sql);
  return orders;
}


// // the call gets info for an order
// // need to make it insert to orders table
// async function getOrderFromCart(userId) {
//   // need to insert values to the last 3 cell is the row
//   let sql = 'SELECT u.user_id, s.cart_id, SUM(c.quantity * c.price) AS total_price, u.city, u.street '+ //shipping_date, order_timestamp, credit_card_last_digits '+
//               'FROM shopping_carts s RIGHT JOIN users u '+
//               'ON u.user_id = s.user_id '+

//               'RIGHT JOIN cart_items c '+
//               'ON c.shopping_cart_id = s.cart_id '+
//               'WHERE u.user_id=?';
  
//   let parameters = [userId.user_id];
//   let order = await connection.executeWithParameters(sql, parameters);
//   console.log(order);
//   return order;
// }





module.exports = {
  getAllOrders,
  getAllUserOrders,
  addOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getNumberOfOrders
};


