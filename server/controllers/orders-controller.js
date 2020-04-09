let ordersLogic = require("../logic/orders-logic");
const express = require("express");
const router = express.Router();

// get all orders
router.get("/", async (request, response) => {

    try {
        let allOrders = await ordersLogic.getAllOrders();
        response.json(allOrders);

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }
});


// get user orders
router.get("/:id", async (request, response) => {

    let userId = request.params.id;

    try {
        let userOrders = await ordersLogic.getAllUserOrders(userId);
        response.json(userOrders);

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }
});


router.post("/", async (request, response) => {

    let order = request.body;

    try {
        await ordersLogic.addOrder(order);
        response.status(200).send();

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }
});

router.put("/", async (request, response) => {

    let order = request.body;

    try {
        await ordersLogic.updateOrder(order);
        response.status(200).send();

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }
});

router.put("/updateOrderStatus", async (request, response) => {

    let order = request.body;

    try {
        await ordersLogic.updateOrderStatus(order);
        response.status(200).send();

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }
});

router.delete("/:id", async (request, response) => {

    let orderId = request.params.id;

    try {
        await ordersLogic.deleteOrder(orderId);
        response.status(200).send("order deleted");

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }
});

module.exports = router;