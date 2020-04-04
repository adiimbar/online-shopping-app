let categoriesLogic = require("../logic/categories-logic");
const express = require("express");
const router = express.Router();


// get all categories
// GET http://localhost:3000/users/
router.get("/", async (request, response) => {
    try {
        let categories = await categoriesLogic.getAllCategories();
        console.log(categories)
        response.json(categories);
        
    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }

});

// get all category products
router.get("/:id", async (request, response) => {
    try {
        let categoryProducts = await categoriesLogic.getAllCategoryProducts(request.params.id);
        console.log(categoryProducts)
        response.json(categoryProducts);
        
    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }

});

// add category
router.post("/", async (request, response) => {

    let category = request.body;

    try {
        let successfullCategoryInsert = await categoriesLogic.addCategory(category);
        response.json(successfullCategoryInsert);
        
    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }

});

router.put("/", async (request, response) => {

    let category = request.body;

    try {
        await categoriesLogic.updateCategory(category);
        response.status(200).send("category has been updated");

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..."});
    }
});

// delete category
router.delete("/:id", async (request, response) => {

    try {
        await categoriesLogic.deleteCategory(request.params.id);
        response.status(200).send("category has been deleted");
        
    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }

});


module.exports = router;

