let cartItemsDao = require("../dao/cartItems-dao");
let usersLogic = require("./users-logic");
const validation = require("../validation/validation");


async function addCartItem(cartItem, authorizationString) {
    let userCacheData = await usersLogic.getMe(authorizationString);

    let cartId = userCacheData.userCart;
    cartItem.shopping_cart_id = cartId;
    // console.log('cart item obj in cartItem logic');
    // console.log(cartItem);

    await validation.addCartItemValidation(cartItem);

    let isItemInCart = await cartItemsDao.getCartItem(cartItem);
    // console.log(isItemInCart);
    // if the item is not in the cart it will be added - using addCartItem
    // and if the item is already in the cart it will be updated
    if (isItemInCart == null || isItemInCart.length == 0) {
        await cartItemsDao.addCartItem(cartItem);
    } else {
        // updateCartItem(cartItem);
        await cartItemsDao.updateCartItem(cartItem);
    }

    // await cartItemsDao.addCartItem(cartItem);
}

async function updateCartItem(cartItem) {
    await validation.updateCartItemValidation(cartItem);

    await cartItemsDao.updateCartItem(cartItem);
}

async function deleteItemFromCart(productId, authorizationString) {
    let userCacheData = await usersLogic.getMe(authorizationString);

    let cartId = userCacheData.userCart;
    let cartItem = {
        productId: productId,
        cartId: cartId
    }

    await validation.deleteItemFromCartValidation(cartItem);

    await cartItemsDao.deleteItemFromCart(cartItem);
}

async function emptyCartItems(authorizationString) {
    let userCacheData = await usersLogic.getMe(authorizationString);

    let cartId = userCacheData.userCart;

    await validation.emptyCartValidation(cartId);
   
    await cartItemsDao.emptyCartItems(cartId);
}

// // decide where to send the request - getCartItem of getAllCartItems
// function getCartItemSwitch(queryRequest) {
//     if(queryRequest.getAll == false) {
//         let cartItem = getCartItem(queryRequest);
//         return cartItem;
//     } else{
//         getAllCartItems(queryRequest);
//     }
// }

// need to change the object passed - it should contain product_id and shopping_cart_id
async function getCartItem(productIdAndCartId) {
    let cartItem = await cartItemsDao.getCartItem(productIdAndCartId);
    // console.log(cartItem);
    return cartItem;
}

async function getAllCartItems(authorizationString) {
    // getting user data from cache by using user token
    let userCacheData = await usersLogic.getMe(authorizationString);

    let cartId = userCacheData.userCart;
    let allCartItems = await cartItemsDao.getAllCartItems(cartId);
    return allCartItems;
}

// internal use - to be called by orders logic
async function getCartItemsTotalPrice(cartId) {
    let sumedItems = await cartItemsDao.getSumPerItemAndQuantityFromCart(cartId);
    // console.log(sumedItems);

    let totalPrice = 0;

    for (let value of Object.values(sumedItems)) {
        totalPrice = totalPrice + Number(value.sum);
    }
    
      console.log(totalPrice);

    return totalPrice;
}


module.exports = {
    addCartItem,
    updateCartItem,
    deleteItemFromCart,
    emptyCartItems,
    getCartItem,
    getAllCartItems,
    getCartItemsTotalPrice
};

// getCartItemsTotalPrice(12)