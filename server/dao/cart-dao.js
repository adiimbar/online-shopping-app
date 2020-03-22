let connection = require("./connection-wrapper");

async function addCart(userId) {
    let sql = 'INSERT INTO shopping_carts (user_id, cart_creation_date) values(?, CURRENT_TIMESTAMP)';
    let parameters = [userId];
    await connection.executeWithParameters(sql, parameters);
}

async function getCartByUserId(userId) {
              // מה חוזר בתשובה
    let sql = 'SELECT u.user_id, s.cart_id, s.cart_creation_date '+
                'FROM users u RIGHT JOIN shopping_carts s '+
                'ON u.user_id = s.user_id '+
                'where u.user_id = ?';
    
    let parameters = [userId];
    let purchases = await connection.executeWithParameters(sql, parameters);
    console.log(purchases);
    return purchases;
}

// async function deleteCart(cartId) {
//     let sql = "delete from shopping_carts where cart_id=?";
//     let parameters = [cartId];
//     await connection.executeWithParameters(sql, parameters);    
// }



module.exports = {
    addCart,
    getCartByUserId
};

// addCart(987654321);

// getCartByUserId(987654321);

// deleteCart(4);