let connection = require("./connection-wrapper");

// need to move CURRENT_TIMESTAMP from sql to parameters
async function addCart(userId) {
    let sql = 'INSERT INTO shopping_carts (user_id, cart_creation_date) VALUES(?, CURRENT_TIMESTAMP)';
    let parameters = [userId];
    await connection.executeWithParameters(sql, parameters);
}

async function getCartByUserId(userId) {

    let sql = "SELECT * FROM shopping_carts WHERE user_id = ?";

    // let sql = 'SELECT u.user_id, s.cart_id, s.cart_creation_date '+
    //             'FROM users u RIGHT JOIN shopping_carts s '+
    //             'ON u.user_id = s.user_id '+
    //             'WHERE u.user_id = ?';
    
    let parameters = [userId];
    let userCart = await connection.executeWithParameters(sql, parameters);
    console.log(userCart);
    return userCart;
}

async function getAllCarts() {
    let sql = "SELECT * FROM shopping_carts";
    let carts = await connection.execute(sql);
    console.log(carts);
    return carts;
}

async function deleteCart(cartId) {
    let parameters = [cartId];

    let sql1 = "DELETE FROM cart_items WHERE shopping_cart_id=?"
    await connection.executeWithParameters(sql1, parameters);

    let sql = "DELETE FROM shopping_carts WHERE cart_id=?"
    let deleteResponce = await connection.executeWithParameters(sql, parameters);
    return deleteResponce
}

module.exports = {
    addCart,
    getCartByUserId,
    getAllCarts,
    deleteCart
};
