let productsLogic = require("../logic/products-logic");
const express = require("express");
const router = express.Router();


router.post("/", async (request, response) => {

    let product = request.body;

    try {
        let successfullyAddedProduct = await productsLogic.addProduct(product);
        response.json(successfullyAddedProduct);

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});

router.put("/", async (request, response) => {

    let user = request.body;

    try {
        await productsLogic.updateProduct(user);
        response.status(200).send("secessus! product updated");

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "Invalid product details" });
    }
});

router.get("/", async (request, response) => {
    try {
        let allProducts = await productsLogic.getAllProducts();
        response.json(allProducts);

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }

});

router.get("/:id", async (request, response) => {

    let categoryId = request.params.id;

    try {
        let products = await productsLogic.getAllProductsByCategoryId(categoryId);
            // console.log(products);
            response.json(products);

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }

});

router.get("/getProduct/:id", async (request, response) => {
    try {
        let product = await productsLogic.getProduct(request.params.id);
            console.log(product);
            response.json(product);

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }

});

module.exports = router;