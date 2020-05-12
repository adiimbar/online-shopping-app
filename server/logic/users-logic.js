let usersDao = require("../dao/users-dao");
const jwt = require('jsonwebtoken');
const config = require('../config.json');
let ServerError = require("./../errors/server-error");
let ErrorType = require("../errors/error-type");

const crypto = require("crypto");
// mock salt
const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";

// const usersCache = new Map();


const validation = require("../validation/validation");
// const userSchemas = require('../models/userSchemas');
// const middleware = require('../middleware/Joi-middlewere');


async function addUser(user) {
    await validation.userRegistrationValidation(user);

    // if (await usersDao.isUserExistByName(user.username)){
    //     throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    // }

        // hash password
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
    // console.log("Hashed password : " + user.password);

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

    // let authorizationString = request.headers["authorization"];

    // // Removing the bearer prefix, leaving the clean token
    // let token = authorizationString.substring("Bearer ".length);
    // let userData = usersCache.get(token);

    // console.log("token : " + token);
    // console.log("User data " + JSON.stringify(userData));

    console.log("***********" + usersCache);

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

    // hash password
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
    // console.log("Hashed password : " + user.password);

    let usersLoginResult = await usersDao.login(user);

    // console.log(usersLoginResult);
    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    let email = usersLoginResult[0].email;
    let userType = usersLoginResult[0].type;

    const token = jwt.sign({ sub: email }, config.secret);
    // need to save to cache
    // usersCache.set(token, usersLoginResult);

    return {token:token, userType:userType};
}

async function getAllUsers() {
    // Validations
    let users = await usersDao.getAllUsers();
    return users;
}


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
//    identification: "000000000",
//    email: "yourmama@gmail.com",
//    password: "1234",
//    confirmPassword: "1234",
//    firstName: "Rick",
//    lastName: "Sanchez",
//    city: "asdf",
//    street: "qwer"
// }

// addUser(user);

// updateUserType(user);

// getUser(9);

// deleteUser(9);

// changePassword(user);

// login(user);