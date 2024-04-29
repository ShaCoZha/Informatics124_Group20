const userData = require("../models/user/userModel");
const userProfile = require("../models/user/userProfileModel");
const bcrypt = require('bcryptjs');

async function createUser(name, email, password, displayName, year, department, major, role) {
  var err = new Error();
  try{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await new userData({name : name, email : email, password_hash : hashedPassword, salt : salt, role : role}).save();
    const newUserProfile = await new userProfile({name : name, displayName : displayName, year : year, department : department, major : major}).save();
  }
  catch (error) {
    return error;
  }
}

async function updateUserProfile(name,displayName,year,department,major) {
  isThereUser = await findUserProfile(name);
  try
  {
    if(isThereUser)
    {
      await userProfile.findOneAndUpdate(
        { name: name },
        { $set: { displayName: displayName, year: year, department: department, major: major } }
      );
    }
    else
    {
      const newUserProfile = await new userProfile({name : name, displayName : displayName, year : year, department : department, major : major}).save();
    }
  }
  catch (error) {
    return error;
  }
}

async function userLogin(username, password) {
  try{
    const Users = await findUser(username);
    if(Users == null)
    {
      return Error("User Not Found")
    }

    const loginStatus = await bcrypt.compare(password,Users.password_hash);
    
    if(loginStatus == false)
    {
      return Error("Login Failed, Wrong Password");
    }

    return true;
  }
  catch (error) {
    return Error("Login Failed, Unexpected Error");
  }
}

async function findUser(name) {
  try{
    const Users = await userData.findOne({"name": name});
    if(Users == null)
    {
      throw error;
    }
    else
    {
      return Users;
    }
  }
  catch (error) {
    return null;
  }
}

async function findUserProfile(name) {
  try{
    const Users = await userProfile.findOne({"name": name});
    if(Users == null)
    {
      throw error;
    }
    else
    {
      return Users;
    }
  }
  catch (error) {
    return null;
  }
}

module.exports = {
  createUser,
  userLogin,
  updateUserProfile,
  findUserProfile
};