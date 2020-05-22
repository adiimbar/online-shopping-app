let ordersDao = require("../dao/orders-dao");
let usersLogic = require("./users-logic");
let cartItemsLogic = require("../logic/cartItems-logic");
let productsLogic = require("../logic/products-logic");
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

    let userCacheData = await usersLogic.getMe(authorizationString);

    let totalPrice = await cartItemsLogic.getCartItemsTotalPrice(userCacheData.userCart);
    // let cartItems = getAllCartItems(authorizationString);


    // extract the last 4 digits of credit card
    order.creditCard = order.creditCard.slice(-4);
    order.cartId = userCacheData.userCart;
    order.userId = userCacheData.userId;
    order.totalPrice = totalPrice;
    
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

async function getNumberOfOrders() {
    // Validations
    let numberOfOrders = await ordersDao.getNumberOfOrders();
    let numberOfProducts = await productsLogic.getNumberOfProducts();

    let storeDetails = {
        numberOfOrders: numberOfOrders[0].numOfOrders,
        numberOfProducts: numberOfProducts[0].numOfProducts
    }

    return storeDetails
}

module.exports = {
    getAllOrders,
    getAllUserOrders,
    addOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    getNumberOfOrders
};

