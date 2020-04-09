let connection = require("./connection-wrapper");

async function addUser(user) {
    let sql = 'INSERT INTO users (identification, name, surname, email, password, city, street) VALUES(?, ?, ?, ?, ?, ?, ?)';
    let parameters = [user.identification, user.name, user.surname, user.email, user.password, user.city, user.street];
    await connection.executeWithParameters(sql, parameters);
}

// Only by admin
async function updateUserType(user) {
    let sql = "UPDATE users SET type = ? WHERE user_id=? ";
    let parameters = [user.type, user.user_id];
    // let parameters = ["ADMIN", user.user_id];
    // let parameters = [user.type, user.id];
    await connection.executeWithParameters(sql, parameters);
}

async function getUser(userId) {
    let sql = "SELECT * FROM users WHERE user_id=?";
    let parameters = [userId];
    let user = await connection.executeWithParameters(sql, parameters);
    // console.log(user);
    return user;
}

async function deleteUser(userId) {
    let parameters = [userId];
    let sql1 = "DELETE FROM orders where user_id=?";
    await connection.executeWithParameters(sql1, parameters);

    let sql2 = "DELETE FROM shopping_carts where user_id=?";
    await connection.executeWithParameters(sql2, parameters);

    let sql3 = "DELETE FROM users where user_id=?";
    let deleteResponce = await connection.executeWithParameters(sql3, parameters);
    return deleteResponce;  
}

async function changePassword(user) {
    let sql = "UPDATE users SET password = ? WHERE user_id=?";
    let parameters = [user.password, user.user_id];
    await connection.executeWithParameters(sql, parameters);
}

async function updateUserAddress(user) {
    let sql = "UPDATE users SET city=?, street=? WHERE user_id=?"
    let parameters = [user.city, user.street, user.user_id];
    await connection.executeWithParameters(sql, parameters);

}

// only by admin
async function getAllUsers() {
    let sql = "SELECT * FROM users";
    let users = await connection.execute(sql);
    // console.log(users);
    return users;
}

async function login(user) {
    let sql = "SELECT * FROM users WHERE email =? AND password =?";
    let parameters = [user.email, user.password];
    let usersLoginResult = await connection.executeWithParameters(sql, parameters);
    // console.log(usersLoginResult);
    return usersLoginResult;
    // return usersLoginResult[0];


    // if (usersLoginResult.length == 0) {
    //     throw new Error("Unauthorized");
    // }
}


module.exports = {
    addUser,
    updateUserType,
    getUser,
    deleteUser,
    changePassword,
    updateUserAddress,
    getAllUsers,
    login
};



let userToUpdate = {
    id: '5',
    type: 'ADMIN'
}

let user = {
    identification: '56789',
    name: 'samwise',
    surname: 'gamgee',
    email: 'bobit@gmail.com',
    password: '1234',
    city: 'the shire',
    street: 'sam street'
}






// addUser(user);

// updateUserType(userToUpdate)

// getUser(1);

// deleteUser(4);

// changePassword(user);

// login({userName: 'bubu',password: '1234'});

// login(user);

// let user = {userName: 'adi', password: '1234'};
