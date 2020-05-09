let usersDao = require("../dao/users-dao");
const jwt = require('jsonwebtoken');
const config = require('../config.json');
let ServerError = require("./../errors/server-error");
let ErrorType = require("../errors/error-type");

// const userValidation = require("../models/users");
const validation = require("../validation/validation");

// const userSchemas = require('../models/userSchemas');
// const middleware = require('../middleware/Joi-middlewere');


async function addUser(user) {
    await validation.userRegistrationValidation(user);

        // need to hash password and send it to the dao


    await usersDao.addUser(user);
}


// need to validate for user type AND privent admins from abuse
// Only by admin
async function updateUserType(user) {
    // Validations
    // await (userValidation(user))
    await usersDao.updateUserType(user);
}

// need to consider not giving user type for COSTUMER request 
async function getUser(id) {
    let user = await usersDao.getUser(id);
    // console.log(user);
    return user;
}

// Only by admin
async function deleteUser(userId) {
        // Validations
    await usersDao.deleteUser(userId);
}

async function changePassword(user) {
    // Validations
    await usersDao.changePassword(user);
}

async function updateUserAddress(user) {
    // Validations
    // await (userValidation(user))
    await usersDao.updateUserAddress(user);
}

async function login(user) {

    await validation.userLoginValidation(user);

    // need to hash password and send it to the dao

    let usersLoginResult = await usersDao.login(user);

    // console.log(usersLoginResult);
    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    let email = usersLoginResult[0].email;
    let userType = usersLoginResult[0].type;
    const token = jwt.sign({ sub: email }, config.secret);

    // need to save to cache

    return {token:token, userType:userType};
}



async function getAllUsers() {
    // Validations
    let users = await usersDao.getAllUsers();
    return users;
}



// function validateUser(user) {

//     const errorDetails =  middleware(userSchemas.login, user);
//     console.log(errorDetails);

//     if (errorDetails) {
//         throw new Error("invalid user");
//     }

// }




module.exports = {
    addUser,
    updateUserType,
    getUser,
    deleteUser,
    changePassword,
    updateUserAddress,
    login,
    getAllUsers
};




// let user = {
//     identification: "000000000",
//     name: "samwise",
//     surname: "gamgee",
//     email: "esomehobbit@gmail.com",
//     password: "1234",
//     city: "the shire",
//     street: "shire street"
// }

// addUser(user);

// updateUserType(user);

// getUser(9);

// deleteUser(9);

// changePassword(user);

// login(user);