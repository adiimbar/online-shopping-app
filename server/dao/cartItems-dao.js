let connection = require("./connection-wrapper");

// probability need to change the sql call (might need to use join)
//need to validate no double inserts
async function addCartItem(cartItem) {

    // console.log("inside cart items dao, obj: " +cartItem);
    // calculate the total price (quantity * product price)
    // let products_price = cartItem.quantity * cartItem.price;

    //moke - might remove product price from cart items table
    // or take the price from products table with join
    let products_price = 123456;

    let sql = 'INSERT INTO cart_items (product_id, quantity, products_price, shopping_cart_id) VALUES(?, ?, ?, ?)';
    let parameters = [cartItem.product_id, cartItem.quantity, products_price, cartItem.shopping_cart_id];
    await connection.executeWithParameters(sql, parameters);
}

// price might need to be updated due to admin price update
async function updateCartItem(cartItem) {

    // calculate the total price (quantity * product price)
    // let products_price = cartItem.quantity * cartItem.price;

     //moke - might remove product price from cart items table
    // or take the price from products table with join
    let products_price = 123456;

    let sql = "UPDATE cart_items SET quantity = ?, products_price = ? WHERE (product_id=? AND shopping_cart_id=?)";
    let parameters = [cartItem.quantity, products_price, cartItem.product_id, cartItem.shopping_cart_id];
    await connection.executeWithParameters(sql, parameters);
}

// need to change the passed variable to include only product_id and shopping_cart_id
async function deleteItemFromCart(cartItem) {
    let sql = "DELETE FROM cart_items WHERE (product_id=? AND shopping_cart_id=?)";
    let parameters = [cartItem.productId, cartItem.cartId];
    await connection.executeWithParameters(sql, parameters);    
}

// need to change the passed variable to include only product_id and shopping_cart_id
async function getCartItem(cartItem) {
    let sql = "SELECT * FROM cart_items WHERE (product_id=? AND shopping_cart_id=?)";
    let parameters = [cartItem.product_id, cartItem.shopping_cart_id];
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
    // console.log(cartItems);
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
// }

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
    emptyCartItems,
    getSumPerItemAndQuantityFromCart
};



// let cartItem =  { productID: "3", cartID: "4" };


// getCartItem(cartItem);

let cartItem = {
    product_id: 5,
    quantity: 42,
    products_price: 13,
    shopping_cart_id: 8
}

// addCartItem(cartItem);

// updateCartItem(cartItem);

// getCartItem(cartItem);

// getAllCartItems(4)

// deleteItemFromCart(cartItem);

// let cartId = 8;
// getAllCartItems(cartId);

// getTotalPriceFromCart(12);