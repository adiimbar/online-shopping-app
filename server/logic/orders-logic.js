let ordersDao = require("../dao/orders-dao");
let usersLogic = require("./users-logic");
let cartItemsLogic = require("../logic/cartItems-logic");
const validation = require("../validation/validation");


async function getAllOrders() {
    // Validations
    let allUsers = await ordersDao.getAllOrders();
    // console.log(allUsers);
    return allUsers;
}

async function getAllUserOrders(userId) {
    // Validations
    let userOrders = await ordersDao.getAllUserOrders(userId);
    // console.log(userOrders);
    return userOrders;
}

async function addOrder(order, authorizationString) {

    console.log('inside orders logic');
    console.log(order);

    let userCacheData = await usersLogic.getMe(authorizationString);

    console.log(userCacheData);

    let totalPrice = await cartItemsLogic.getCartItemsTotalPrice(userCacheData.cartId);
    // let cartItems = getAllCartItems(authorizationString);


    // extract the last 4 digits of credit card
    order.creditCard = order.creditCard.slice(-4);
    order.cartId = userCacheData.userCart;
    order.userId = userCacheData.userId;
    order.totalPrice = totalPrice;
    
    console.log('order obj in orders logic');
    console.log(order);

    // Validations

    await ordersDao.addOrder(order);
}

async function updateOrder(order) {
    // Validations
    await ordersDao.updateOrder(order);
}

async function updateOrderStatus(order) {
    // Validations
    await ordersDao.updateOrderStatus(order);
}

async function deleteOrder(orderId) {
    // Validations
    await ordersDao.deleteOrder(orderId);
}

module.exports = {
    getAllOrders,
    getAllUserOrders,
    addOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder
};



// addOrderFromCart("987654321");

