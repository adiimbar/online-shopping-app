let cartItemsDao = require("../dao/cartItems-dao");

async function addCartItem(cartItem) {
    // Validations
    await cartItemsDao.addCartItem(cartItem);
}

async function updateCartItem(cartItem) {
    // Validations
    await cartItemsDao.updateCartItem(cartItem);
}

// need to change the passed variable to include only product_id and shopping_cart_id
async function deleteItemFromCart(cartItem) {
    await cartItemsDao.deleteItemFromCart(cartItem);
}

// need to change the object passed - it should contain product_id and shopping_cart_id
async function getCartItem(cartItem) {
    let cartItem = await cartItemsDao.getCartItem(cartItem);
    return cartItem;
}

async function getAllCartItems(cartID) {
    let allCartItems = await cartItemsDao.getAllCartItems(cartID);
    return allCartItems;
}


module.exports = {
    addCartItem,
    updateCartItem,
    deleteItemFromCart,
    getCartItem,
    getAllCartItems
};

