let usersDao = require("../dao/users-dao");
// need to change userValidation to UserValidation
const userValidation = require("../models/users");
const validation = require("../validation/validation");


async function addUser(user) {
    // Validations
    validateUser(user);

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
    // Validations
    validateUser(user);
    let usersLoginResult = await usersDao.login(user);
    // validation.validResponse(usersLoginResult)
    return usersLoginResult;
}
// console.log('1');
// let user = {email: 'miky@gmail.com', password: '5678'};
// login(user);



async function getAllUsers() {
    // Validations
    let users = await usersDao.getAllUsers();
    return users;
}



function validateUser(user) {
    // Validate the cat to add:
    const errorDetails = userValidation.validate(user);
    if (errorDetails) {
        throw new Error("invalid user");
    }

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