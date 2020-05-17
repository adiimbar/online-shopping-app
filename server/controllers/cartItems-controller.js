let cartItemsLogic = require("../logic/cartItems-logic");
const express = require("express");
const url = require('url');
const router = express.Router();

// add cart item
// put http://localhost:3000/cartItems/
router.post("/", async (request, response) => {

    let cartItemObject = request.body;
    let authorizationString = request.headers['authorization'];

    try {
        let cartItem = await cartItemsLogic.addCartItem(cartItemObject, authorizationString);
        response.json(cartItem);

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});

// update cart item
// POST http://localhost:3000/cartItems/
router.put("/", async (request, response) => {

    let cartItem = request.body;

    try {
        await cartItemsLogic.updateCartItem(cartItem);
        response.status(200).send("secessus! product updated");

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "Invalid product details" });
    }
});

// empty cart items
router.delete("/emptyCartItems/:id", async (request, response) => {

    let cartId = request.params.id;

    try {
        await cartItemsLogic.emptyCartItems(cartId);
        response.status(200).send("shopping cart is empty now");

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "Invalid product details" });
    }
});

// delete cart item
// POST http://localhost:3000/cartItems/updateCartItem
router.delete("/:cart_and_product", async (request, response) => {

    let queryRequest = url.parse(request.url,true).query;

    try {
        await cartItemsLogic.deleteItemFromCart(queryRequest);
        response.status(200).send("item deleted from cart");

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "Invalid product details" });
    }
});

router.get("/allCartItems", async (request, response) => {

    let authorizationString = request.headers['authorization'];

    try {
        let cartItems = await cartItemsLogic.getAllCartItems(authorizationString);
        response.json(cartItems);    
        
    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }
});

// get cart item by product id and shopping cart id
// url example: cartItems/action?productId=5&cartId=8
router.get("/:cart_and_product", async (request, response) => {

    let queryRequest = url.parse(request.url,true).query;

    try {
        let cartItem = await cartItemsLogic.getCartItem(queryRequest);
        response.json(cartItem);
        
    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }
});


module.exports = router;