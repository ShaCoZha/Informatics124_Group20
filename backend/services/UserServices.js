const UserRepositories = require("../repositories/UserRepositories");

async function createUser(name, password, role) {
    return await UserRepositories.createUser(name,password,role);
}

async function userLogin(username, password) {
  return await UserRepositories.userLogin(username,password);
}

module.exports = {
  createUser,
  userLogin
};