let usersDao = require("../dao/users-dao");

async function addUser(user) {
    // Validations
    await usersDao.addUser(user);
}

// Only by admin
async function updateUserType(user) {
    // Validations
    // await (userValidation(user))
    await usersDao.updateUserType(user);
}

async function getUser(id) {
    let user = await usersDao.getUser(id);
    // console.log(user);
    return user;
}

// // Only by admin
// async function deleteUser(id) {
//     await usersDao.deleteUser(id);
// }

async function changePassword(user) {
    // Validations
    await usersDao.changePassword(user);
}


async function login(user) {
    // Validations
    await usersDao.login(user);
}
// console.log('1');
// let user = {email: 'miky@gmail.com', password: '5678'};
// login(user);



async function getAllUsers() {
    // Validations
    let users = await usersDao.getAllUsers();
    return users;
}



module.exports = {
    addUser,
    updateUserType,
    getUser,
    // deleteUser,
    changePassword,
    login,
    getAllUsers
};




let user = {
    user_id: "000000000",
    name: "samwise",
    surname: "gamgee",
    email: "awesomehobbit@gmail.com",
    password: "1234",
    city: "the shire",
    street: "shire street"
}

// addUser(user);

// updateUserType(user);

// getUser(9);

// deleteUser(9);

// changePassword(user);

// login(user);