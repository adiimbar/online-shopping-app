let cartsLogic = require("../logic/carts-logic");
const express = require("express");
const router = express.Router();

// add cart
// POST http://localhost:3000/carts/addCart
router.post("/", async (request, response) => {

    let userId = request.body;

    try {
        let cart = await cartsLogic.addCart(userId);
        response.json(cart);

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});


// get all carts
router.get("/", async (request, response) => {

    try {
        let carts = await cartsLogic.getAllCarts();
        response.json(carts);
        
    } catch (error) {
        console.log(error);
        response.status(404).send("something went terribly wrong...");
    }

});

// get cart by userID
router.get("/:userID", async (request, response) => {

    try {
        let cart = await cartsLogic.getCartByUserId(request.params.userID);
        response.json(cart);
        
    } catch (error) {
        console.log(error);
        response.status(404).send("something went terribly wrong...");
    }

});

// delete cart
router.delete("/:id", async (request, response) => {

    try {
        await cartsLogic.deleteCart(request.params.id);
        response.status(200).send("shopping cart was deleted");

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..."});
    }
});



module.exports = router;