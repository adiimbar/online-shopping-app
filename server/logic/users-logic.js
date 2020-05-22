let usersDao = require("../dao/users-dao");
let cartsLogic = require('./carts-logic');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
let ServerError = require("./../errors/server-error");
let ErrorType = require("../errors/error-type");

const crypto = require("crypto");
const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";

const usersCache = new Map();


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

    await usersDao.addUser(user);
}

// need to validate for user type AND privent admins from abuse
// Only by admin
async function updateUserType(user) {
    // Validations
    // await (userValidation(user))
    await usersDao.updateUserType(user);
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
    let addUserResult = await usersDao.updateUserAddress(user);    
    return addUserResult;
}

async function login(user) {

    await validation.userLoginValidation(user);

    // hash password
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");

    let usersLoginResult = await usersDao.login(user);

    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    let email = usersLoginResult[0].email;
    let userType = usersLoginResult[0].type;
    let userId = usersLoginResult[0].user_id;
    let city = usersLoginResult[0].city;
    let street = usersLoginResult[0].street;
    let firstName = usersLoginResult[0].firstName;
    let lastName = usersLoginResult[0].lastName;
    let cartId = usersLoginResult[0].cart_id;

    //  Creates a cart for the user if he dose not have one
    if (cartId === null) {
        await cartsLogic.addCart(userId);
        newCartId = await cartsLogic.getCartByUserId(userId);
        cartId = newCartId[0].cart_id;
    }

    let userData = {
        userId: userId,
        userType: userType,
        email: email,
        userCart: cartId,
        city: city,
        street: street,
        firstName: firstName,
        lastName: lastName
    };

    const token = jwt.sign({ sub: email }, config.secret);
    // save to cache
    usersCache.set(token, userData);

    return {token:token, userType:userType};
}

// get user details from server cache
async function getMe(authorizationString) {

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    let userData = usersCache.get(token);

    // console.log("***********" + usersCache);

    return userData;
}


async function getUser(id) {

    // let authorizationString = request.headers["authorization"];

    // // Removing the bearer prefix, leaving the clean token
    // let token = authorizationString.substring("Bearer ".length);
    // let userData = usersCache.get(token);

    let user = await usersDao.getUser(id);
    // console.log(user);
    return user;
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
    getAllUsers,
    getMe
};

