let productsLogic = require("../logic/products-logic");
const express = require("express");
const router = express.Router();

// add product
// POST http://localhost:3000/products/addProduct
router.post("/addProduct", async (request, response) => {

    let product = request.body;

    try {
        let successfullyAddedProduct = await productsLogic.addProduct(product);
        response.json(successfullyAddedProduct);
    }
    catch (error) {
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});

// update product
// POST http://localhost:3000/products/updateProduct
router.put("/updateProduct", async (request, response) => {

    let user = request.body;

    try {
        await productsLogic.updateProduct(user);
        response.status(200).send("secessus! product updated");
    }
    catch (error) {
        response.status(401).json({ error: "Invalid product details" });
    }
});

// get product
router.get("/:id", async (request, response) => {
    try {
        let product = await productsLogic.getProduct(request.params.id);
        if(product == "") {
            response.status(404).send("No product found in database");
        } else {
            console.log(product);
            response.json(product);
        }
        
    } catch (error) {
        response.status(404).send("something went terribly wrong...");
    }

});

// // get all products
// router.get("/getAllProducts", async (request, response) => {
//     try {
//         let allProducts = await productsLogic.getAllProducts();
//         console.log(allProducts)
//         response.json(allProducts);
        
//     } catch (error) {
//         response.status(404).send("something went terribly wrong...");
//     }

// });



module.exports = router;