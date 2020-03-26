let connection = require("./connection-wrapper");

// the call gets info for an order
// need to make it insert to orders table
async function addOrderFromCart(userId) {
  // need to insert values to the last 3 cell is the row
  let sql = 'SELECT u.user_id, s.cart_id, SUM(c.quantity * c.price) AS total_price, u.city, u.street '+ //shipping_date, order_timestamp, credit_card_last_digits '+
              'FROM shopping_carts s RIGHT JOIN users u '+
              'ON u.user_id = s.user_id '+
              'RIGHT JOIN cart_items c '+
              'ON c.shopping_cart_id = s.cart_id '+
              'where u.user_id=?';
  
  let parameters = [userId.user_id];
  let order = await connection.executeWithParameters(sql, parameters);
  // console.log(order);
  return order;
}

// async function updateOrderStatus(setStatus) {
//   let sql = "UPDATE orders SET status = ? where order_id=? ";
//   let parameters = [setStatus.status, setStatus.order_id];
//   await connection.executeWithParameters(sql, parameters);
// }


module.exports = {
  addOrderFromCart
};


addOrderFromCart({user_id: "987654321"});




