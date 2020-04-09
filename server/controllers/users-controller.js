let usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();

// login
router.post("/login", async (request, response) => {

    let user = request.body;

    try {
        let successfullLoginData = await usersLogic.login(user);
        response.json(successfullLoginData);
        // let token = {token:"1234" , userType:"CUSTOMER"};
        // response.json(token);

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "Invalid user name or password" });
    }
});

// add user
router.post("/", async (request, response) => {

    let user = request.body;

    try {
        await usersLogic.addUser(user);
        response.status(200).send("user added");

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});

// update user type
// only by admin
router.put("/updateUserType", async (request, response) => {

    let user = request.body;

    try {
        await usersLogic.updateUserType(user);
        response.status(200).send(user.name + " is now an ADMIN");

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "Invalid user name or password" });
    }
});

// get all users
router.get("/", async (request, response) => {
    try {
        let users = await usersLogic.getAllUsers();
        response.json(users);
        
    } catch (error) {
        response.status(404).send("No users in database");
    }

});

// getUser
router.get("/:id", async (request, response) => {
    try {
        let user = await usersLogic.getUser(request.params.id);
        response.json(user);
        
    } catch (error) {
        console.log(error);
        response.status(404).send("No user in database");
    }

});

// update - change user password
// POST http://localhost:3000/users/
router.put("/updatePassword", async (request, response) => {

    let user = request.body;

    try {
        await usersLogic.changePassword(user);
        response.status(200).send(user.name + " password was changed");

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..."});
    }
});

// update - change user address
// POST http://localhost:3000/users/
router.put("/", async (request, response) => {

    let user = request.body;

    try {
        await usersLogic.updateUserAddress(user);
        response.status(200).send(user.name + " address was updated");

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..."});
    }
});


// delete user
router.delete("/:id", async (request, response) => {
    try {
        await usersLogic.deleteUser(request.params.id);
        response.status(200).send("user deleted");
        
    } catch (error) {
        console.log(error);
        response.status(404).send("No user in database");
    }

});


module.exports = router;



// {
//     "user_id": "000000000",
//     "name": "samwise",
//     "surname": "gamgee",
//     "email": "awesomehobbit@gmail.com",
//     "password": "1234",
//     "city": "the shire",
//     "street": "shire street"
// }