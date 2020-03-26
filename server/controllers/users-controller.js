let usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();

// add user
// POST http://localhost:3000/users/signup
router.post("/signup", async (request, response) => {

    let user = request.body;

    try {
        let successfullSignupData = await usersLogic.addUser(user);
        response.json(successfullSignupData);
    }
    catch (error) {
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});

// update user type
// POST http://localhost:3000/users/
router.put("/", async (request, response) => {

    let user = request.body;

    try {
        await usersLogic.updateUserType(user);
        response.status(200).send(user.name + " is now an ADMIN");
    }
    catch (error) {
        response.status(401).json({ error: "Invalid user name or password" });
    }
});


// getUser
// GET http://localhost:3000/users/
router.get("/:id", async (request, response) => {
    try {
        let user = await usersLogic.getUser(request.params.id);
        console.log(user)
        response.json(user);
        
    } catch (error) {
        response.status(404).send("No user in database");
    }

});




// update - change user password
// POST http://localhost:3000/users/
router.put("/", async (request, response) => {

    let user = request.body;

    try {
        await usersLogic.changePassword(user);
        response.status(200).send(user.name + " password was changed");
    }
    catch (error) {
        response.status(401).json({ error: "something went terribly wrong..."});
    }
});






// login
// POST http://localhost:3000/users/login
router.post("/login", async (request, response) => {

    // Extracting the JSON from the packet's BODY
    let user = request.body;

    try {
        let successfullLoginData = await usersLogic.login(user);
        response.json(successfullLoginData);
        // let token = {token:"1234" , userType:"CUSTOMER"};
        // response.json(token);
    }
    catch (error) {
        response.status(401).json({ error: "Invalid user name or password" });
    }
});


// // get all users
// router.get("/", async (request, response) => {
//     try {
//         let users = await usersLogic.getAllUsers();
//         console.log(users)
//         response.json(users);
        
//     } catch (error) {
//         response.status(404).send("No users in database");
//     }

// });



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