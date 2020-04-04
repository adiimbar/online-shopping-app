let ordersDao = require("../dao/orders-dao");

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
async function addOrder(order) {
    // Validations
    await ordersDao.addOrder(order);
}
async function updateOrder(order) {
    // Validations
    await ordersDao.updateOrder(order);
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
    deleteOrder
};



// addOrderFromCart("987654321");

