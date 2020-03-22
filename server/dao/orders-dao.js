let connection = require("./connection-wrapper");

// need to make it insert to orders table
async function getOrder(userId) {
  let sql = 'SELECT u.user_id, s.cart_id, SUM(c.quantity * c.price) AS total_price, u.city, u.street '+ //shipping_date, order_timestamp, credit_card_last_digits '+
              'FROM shopping_carts s RIGHT JOIN users u '+
              'ON u.user_id = s.user_id '+
              // 'FROM cart_items c LEFT JOIN shopping_carts s '+
              'RIGHT JOIN cart_items c '+
              // 'RIGHT JOIN (SELECT (quantity * price) FROM cart_items) c '+
              'ON c.shopping_cart_id = s.cart_id '+
              'where u.user_id=?';
  
  let parameters = [userId];
  let order = await connection.executeWithParameters(sql, parameters);
  console.log(order);
  return order;
}

module.exports = {};


getOrder(987654321)




