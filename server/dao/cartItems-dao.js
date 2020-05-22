let connection = require("./connection-wrapper");

async function addCartItem(cartItem) {

    let sql = 'INSERT INTO cart_items (product_id, quantity, shopping_cart_id) VALUES(?, ?, ?)';
    let parameters = [cartItem.product_id, cartItem.quantity, cartItem.cartId];
    await connection.executeWithParameters(sql, parameters);
}

async function updateCartItem(cartItem) {

    let sql = "UPDATE cart_items SET quantity = ? WHERE (product_id=? AND shopping_cart_id=?)";
    let parameters = [cartItem.quantity, cartItem.product_id, cartItem.cartId];
    await connection.executeWithParameters(sql, parameters);
}

async function deleteItemFromCart(cartItem) {
    let sql = "DELETE FROM cart_items WHERE (product_id=? AND shopping_cart_id=?)";
    let parameters = [cartItem.productId, cartItem.cartId];
    await connection.executeWithParameters(sql, parameters);    
}

// need to change the passed variable to include only product_id and shopping_cart_id
async function getCartItem(cartItem) {
    let sql = "SELECT * FROM cart_items WHERE (product_id=? AND shopping_cart_id=?)";
    let parameters = [cartItem.product_id, cartItem.cartId];
    let item = await connection.executeWithParameters(sql, parameters);
    // console.log(item);
    return item;
}

async function getAllCartItems(cartId) {
    let sql = 'SELECT p.product_id, p.image_path, p.product_name, p.price, c.quantity, (p.price*c.quantity) AS sum '+
                'FROM cart_items c LEFT JOIN shopping_carts s '+
                'ON c.shopping_cart_id = s.cart_id '+
                'RIGHT JOIN products p '+
                'ON p.product_id = c.product_id '+
                'WHERE c.shopping_cart_id = ?';
    
    let parameters = [cartId];
    let cartItems = await connection.executeWithParameters(sql, parameters);
    // console.log(cartItems);
    return cartItems;
}

async function getSumPerItemAndQuantityFromCart(cartId) {
    // let sql = 'SELECT p.price, c.quantity, (p.price*c.quantity) AS sum '+
    let sql = 'SELECT (p.price*c.quantity) AS sum '+
                'FROM cart_items c LEFT JOIN shopping_carts s '+
                'ON c.shopping_cart_id = s.cart_id '+
                'RIGHT JOIN products p '+
                'ON p.product_id = c.product_id '+
                'WHERE c.shopping_cart_id = ?';
    
    let parameters = [cartId];
    let cartItems = await connection.executeWithParameters(sql, parameters);
    // console.log(cartItems[0].sum);
    return cartItems;
}


        // the original get all cart items function
// async function getAllCartItems(cartId) {
//     let sql = 'SELECT c.id, c.product_id, c.quantity, c.products_price, s.cart_id '+
//                 'FROM cart_items c LEFT JOIN shopping_carts s '+
//                 'ON c.shopping_cart_id = s.cart_id '+
//                 'WHERE c.shopping_cart_id = ?';
    
//     let parameters = [cartId];
//     let cartItems = await connection.executeWithParameters(sql, parameters);
//     // console.log(cartItems);
//     return cartItems;
// }cartId

async function emptyCartItems(cartId) {
    let sql = "DELETE FROM cart_items WHERE shopping_cart_id=?";
    let parameters = [cartId];
    await connection.executeWithParameters(sql, parameters);    
}


module.exports = {
    addCartItem,
    updateCartItem,
    deleteItemFromCart,
    getCartItem,
    getAllCartItems,
    emptyCartItems,
    getSumPerItemAndQuantityFromCart
};


