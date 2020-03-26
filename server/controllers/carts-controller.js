let cartsLogic = require("../logic/carts-logic");
const express = require("express");
const router = express.Router();

// add cart
// POST http://localhost:3000/carts/addCart
router.post("/addCart", async (request, response) => {

    let userID = request.body;

    try {
        let cart = await cartsLogic.addCart(userID.userId);
        response.json(cart);
    }
    catch (error) {
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});


// get cart by userID
router.get("/:userID", async (request, response) => {
    try {
        console.log(request.params.userID);
        let cart = await cartsLogic.getCartByUserId(request.params.userID);
        if(cart == "") {
            response.status(404).send("No cart found in database");
        } else {
            // console.log(cart);
            response.json(cart);
        }
        
    } catch (error) {
        response.status(404).send("something went terribly wrong...");
    }

});


module.exports = router;