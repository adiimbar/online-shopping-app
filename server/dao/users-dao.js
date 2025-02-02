let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error")

async function addUser(user) {
    let sql = 'INSERT INTO users (identification, firstName, lastName, email, password, city, street) VALUES(?, ?, ?, ?, ?, ?, ?)';
    let parameters = [user.identificationNumber, user.firstName, user.lastName, user.email, user.password, user.city, user.street];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log('inside add user erorr');
        // the error will probably be - duplicate entry
        // throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
        throw new ServerError(ErrorType.EMAIL_ALREADY_REGISTERED, JSON.stringify(user), e);
    }
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
    // console.log(user);
    // let sql = "SELECT * FROM users WHERE email =? AND password =?";

    let sql = 'SELECT u.user_id, u.identification, u.firstName, u.lastName, u.email, u.password, u.type, u.city, u.street, s.cart_id '+
        'FROM users u LEFT JOIN shopping_carts s '+
        'ON u.user_id = s.user_id '+
        'WHERE u.email =? AND u.password =?';

    let parameters = [user.email, user.password];
    // let usersLoginResult = await connection.executeWithParameters(sql, parameters);
    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        // This is an example, for a situation where a TECHNICAL ERROR HAD OCCURED
        // that error threw an exception - WHICH WE WANT TO WRAP with a ServerError
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }

    return usersLoginResult;
    // return usersLoginResult[0];
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
