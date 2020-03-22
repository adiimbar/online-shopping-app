let usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();


// POST http://localhost:3000/users/login
router.post("/login", async (request, response) => {

    // Extracting the JSON from the packet's BODY
    let user = request.body;

    try {
        let successfullLoginData = await usersLogic.login(user);
        response.json(successfullLoginData);
    }
    catch (error) {
        response.status(401).json({ error: "Invalid user name or password" });
    }
});

module.exports = router;