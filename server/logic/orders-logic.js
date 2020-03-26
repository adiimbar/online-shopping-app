let ordersDao = require("../dao/orders-dao");

async function addOrderFromCart(userId) {
    let order = await ordersDao.addOrderFromCart(userId);
    console.log(order);
    return order;
}

module.exports = {
    addOrderFromCart
};



// addOrderFromCart("987654321");

