let ordersLogic = require("../logic/orders-logic");
const express = require("express");
const router = express.Router();

// add order
// POST http://localhost:3000/orders/
router.post("/", async (request, response) => {

    let userId = request.body;

    try {
        console.log('im trying');
        let successfullOrderSubmit = await ordersLogic.addOrderFromCart(userId);
        response.json(successfullOrderSubmit);
    }
    catch (error) {
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});








module.exports = router;


