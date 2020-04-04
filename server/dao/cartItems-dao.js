let connection = require("./connection-wrapper");

// probability need to change the sql call (might need to use join)
//need to validate no double inserts
async function addCartItem(cartItem) {
    let sql = 'INSERT INTO cart_items (product_id, quantity, price, shopping_cart_id) VALUES(?, ?, ?, ?)';
    let parameters = [cartItem.product_id, cartItem.quantity, cartItem.quantity * cartItem.basePrice, cartItem.shopping_cart_id];
    await connection.executeWithParameters(sql, parameters);
}

// price might need to be updated due to admin price update
async function updateCartItem(cartItem) {
    let sql = "UPDATE cart_items SET quantity = ?, price = ? WHERE (product_id=? AND shopping_cart_id=?)";
    let parameters = [cartItem.quantity, cartItem.quantity * cartItem.basePrice, cartItem.product_id, cartItem.shopping_cart_id];
    await connection.executeWithParameters(sql, parameters);
}

// need to change the passed variable to include only product_id and shopping_cart_id
async function deleteItemFromCart(cartItem) {
    let sql = "DELETE FROM cart_items WHERE (product_id=? AND shopping_cart_id=?)";
    let parameters = [cartItem.product_id, cartItem.shopping_cart_id];
    await connection.executeWithParameters(sql, parameters);    
}

// need to change the passed variable to include only product_id and shopping_cart_id
async function getCartItem(cartItem) {
    let sql = "SELECT * FROM cart_items WHERE (product_id=? AND shopping_cart_id=?)";
    let parameters = [cartItem.productID, cartItem.cartID];
    let item = await connection.executeWithParameters(sql, parameters);
    // console.log(item);
    return item;
}

async function getAllCartItems(cartItem) {
    let sql = 'SELECT c.cart_item_id, c.product_id, c.quantity, c.price, s.cart_id '+
                'FROM cart_items c LEFT JOIN shopping_carts s '+
                'ON c.shopping_cart_id = s.cart_id '+
                'WHERE c.shopping_cart_id = ?';
    
    let parameters = [cartItem.cartID];
    let cartItems = await connection.executeWithParameters(sql, parameters);
    // console.log(cartItems);
    return cartItems;
}

async function emptyCartItems(shopping_cart_id) {
    let sql = "DELETE FROM cart_items WHERE shopping_cart_id=?";
    let parameters = [shopping_cart_id];
    await connection.executeWithParameters(sql, parameters);    
}


module.exports = {
    addCartItem,
    updateCartItem,
    deleteItemFromCart,
    getCartItem,
    getAllCartItems,
    emptyCartItems
};



// let cartItem =  { productID: "3", cartID: "4" };


// getCartItem(cartItem);

// let cartItem = {
//     product_id: 3,
//     quantity: 6,
//     basePrice: 4,
//     shopping_cart_id: 4
// }

// addCartItem(cartItem);

// updateCartItem(cartItem);

// getCartItem(cartItem);

// getAllCartItems(4)

// deleteItemFromCart(cartItem);