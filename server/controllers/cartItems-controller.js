let cartItemsLogic = require("../logic/cartItems-logic");
const express = require("express");
const router = express.Router();

// add cart item
// put http://localhost:3000/cartItems/addCartItem
router.put("/addCartItem", async (request, response) => {

    // might need to change the object passed
    let cartItemObject = request.body;

    try {
        let cartItem = await cartItemsLogic.addCartItem(cartItemObject);
        response.json(cartItem);
    }
    catch (error) {
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});


// update cart item
// POST http://localhost:3000/cartItems/updateCartItem
router.put("/updateCartItem", async (request, response) => {

    let cartItem = request.body;

    try {
        await cartItemsLogic.updateCartItem(cartItem);
        response.status(200).send("secessus! product updated");
    }
    catch (error) {
        response.status(401).json({ error: "Invalid product details" });
    }
});



// delete cart item
// POST http://localhost:3000/cartItems/updateCartItem
router.delete("/deleteCartItem", async (request, response) => {

    let cartItem = request.body;

    try {
        await cartItemsLogic.deleteItemFromCart(cartItem);
        response.status(200).send("item deleted from cart");
    }
    catch (error) {
        response.status(401).json({ error: "Invalid product details" });
    }
});


// need to add get getCartItem and getAllCartItems



module.exports = router;