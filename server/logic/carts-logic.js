let cartsDao = require("../dao/carts-dao");

async function addCart(cart) {
    // Validations
    await cartsDao.addCart(cart);
}

async function getCartByUserId(userID) {
    let cart = await cartsDao.getCartByUserId(userID);
    // console.log(product);
    return cart;
}

// // Only by admin
// async function updateCart(cart) {
//     // Validations
//     // await (userValidation(user))
//     await cartsDao.updateCart(cart);
// }

// async function getAllCarts() {
//     // Validations
//     let carts = await cartsDao.getAllCarts();
//     return carts;
// }

// async function deleteCart(id) {
//     await cartsDao.deleteCarts(id);
// }


module.exports = {
    addCart,
    getCartByUserId
};
