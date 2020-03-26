let connection = require("./connection-wrapper");

async function addUser(user) {
    let sql = 'INSERT INTO users (user_id, name, surname, email, password, city, street) values(?, ?, ?, ?, ?, ?, ?)';
    let parameters = [user.user_id, user.name, user.surname, user.email, user.password, user.city, user.street];
    await connection.executeWithParameters(sql, parameters);
}

// Only by admin
async function updateUserType(user) {
    let sql = "UPDATE users SET type = ? where user_id=? ";
    let parameters = ["ADMIN", user.user_id];
    // let parameters = [user.type, user.id];
    await connection.executeWithParameters(sql, parameters);
}

async function getUser(id) {
    let sql = "select * from users where id=?";
    let parameters = [id];
    let user = await connection.executeWithParameters(sql, parameters);
    console.log(user);
    return user;
}

async function deleteUser(id) {
    let sql = "delete from users where id=?";
    let parameters = [id];
    await connection.executeWithParameters(sql, parameters);    
}

async function changePassword(user) {
    let sql = "UPDATE users SET password = ? where user_id=?";
    let parameters = [user.password, user.user_id];
    await connection.executeWithParameters(sql, parameters);
}

async function getAllUsers() {
    let sql = "select * from users";
    let users = await connection.execute(sql);
    console.log(users);
    return users;
}

async function login(user) {
    let sql = "SELECT * FROM users where email =? and password =?";
    let parameters = [user.email, user.password];
    let usersLoginResult = await connection.executeWithParameters(sql, parameters);

    if (usersLoginResult.length == 0) {
        throw new Error("Unauthorized");
    }
    // console.log(usersLoginResult);
    // console.log("All good ! ")
}


module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUserType,
    deleteUser,
    changePassword,
    login
};







// addUser(user);

// updateUserType(userToUpdate)

// getUser(11);

// deleteUser(4);

// changePassword(user);

// login({userName: 'bubu',password: '1234'});

// login(user);

// let user = {userName: 'adi', password: '1234'};




let userToUpdate = {
    id: '5',
    type: 'ADMIN'
}

let user = {
    user_id: '987564361',
    name: 'miky',
    surname: 'shmuz',
    email: 'miky@gmail.com',
    password: '5678'
    // city: 'new city',
    // street: 'new street'
}
