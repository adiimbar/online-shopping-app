let usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const config = require('../config.json');

// login
router.post("/login", async (request, response) => {

    let user = request.body;
    // console.log('user log in controller value:');
    // console.log(user);

    try {
        let successfullLoginData = await usersLogic.login(user);
        response.json(successfullLoginData);

        // let email = successfullLoginData[0].email;
        // let userType = successfullLoginData[0].type;

        // const token = jwt.sign({ sub: email }, config.secret);
        // response.send({token:token, userType:userType});

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "Invalid user name or password" });
    }
});

// add user
router.post("/", async (request, response) => {

    let user = request.body;
    // console.log('in the controller - add user: ' + user);

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

// // get all users
// router.get("/", async (request, response) => {
//     try {
//         let users = await usersLogic.getAllUsers();
//         response.json(users);
        
//     } catch (error) {
//         response.status(401).send("No users in database");
//     }

// });

router.get("/me", async (request, response)=>{
    
    let authorizationString = request.headers["authorization"];


    try {
        let userData = await usersLogic.getMe(authorizationString);

        // passing only these parameters to the user
        let user = {
            email: userData.email,
            city: userData.city,
            street: userData.street,
            firstName: userData.firstName,
            lastName: userData.lastName    
        }

        response.json(user);
        
    } catch (error) {
        console.log(error);
        response.status(401).send("No user in database");
    }

})

// getUser
// router.get("/me", async (request, response) => {
router.get("/:id", async (request, response) => {
    try {
        let user = await usersLogic.getUser(request.params.id);
        response.json(user);
        
    } catch (error) {
        console.log(error);
        response.status(401).send("No user in database");
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
        response.status(401).send("No user in database");
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