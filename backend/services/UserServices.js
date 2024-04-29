const UserRepositories = require("../repositories/UserRepositories");

async function createUser(name, email, password, displayName, year, department, major, role) {
    return await UserRepositories.createUser(name, email, password, displayName, year, department, major, role);
}

async function updateUserProfile(name, displayName, year, department, major) {
  return await UserRepositories.updateUserProfile(name,displayName,year,department,major);
}

async function userLogin(username, password) {
  return await UserRepositories.userLogin(username,password);
}

async function getUserProfile(username) {
  return await UserRepositories.findUserProfile(username);
}

module.exports = {
  createUser,
  userLogin,
  updateUserProfile,
  getUserProfile
};