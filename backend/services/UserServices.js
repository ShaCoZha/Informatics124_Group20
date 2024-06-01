const UserRepositories = require("../repositories/UserRepositories");

async function createUser(name, email, password, displayName, year, department, major, role) {
    const profileColor = await randomColor();
    return await UserRepositories.createUser(name, email, password, displayName, year, department, major, role, profileColor);
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

function randomColor(){
  const colorList = ["darkred", "darkblue", "darkgreen", "darkviolet", "saddlebrown"]
  const randomIndex = Math.floor(Math.random() * colorList.length);
  return colorList[randomIndex];
}

module.exports = {
  createUser,
  userLogin,
  updateUserProfile,
  getUserProfile
};