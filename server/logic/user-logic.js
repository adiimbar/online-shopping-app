let dao = require("../dao/users-dao");

async function login(user) {
    // Validations
    await dao.login(user);
}
// console.log('1');
// let user = {userName: 'adi', password: '1234'};
// login(user);


module.exports = {
    login
};