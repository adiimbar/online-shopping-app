let cartsDao = require("../dao/carts-dao");
const validation = require("../validation/validation");
let ServerError = require("./../errors/server-error");
let ErrorType = require("../errors/error-type");


async function addCart(cart) {
    // Validations
    await cartsDao.addCart(cart);
}

async function getCartByUserId(userID) {
    let cart = await cartsDao.getCartByUserId(userID);

    if (cart == null || cart.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    // console.log(product);
    return cart;
}

// // Only by admin
// async function updateCart(cart) {
//     // Validations
//     // await (userValidation(user))
//     await cartsDao.updateCart(cart);
// }

async function getAllCarts() {
    // Validations
    let carts = await cartsDao.getAllCarts();
    return carts;
}

async function deleteCart(cartId) {
    // Validations
    await cartsDao.deleteCart(cartId);
}


module.exports = {
    addCart,
    getCartByUserId,
    getAllCarts,
    deleteCart
};
