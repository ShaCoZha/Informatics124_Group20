const mongoose = require('mongoose');

const userDataSchema = mongoose.Schema(
  {
    name : {
      type: String,
      required: true
    },

    password_hash : {
      type: String,
      required: true
    },

    email : {
      type: String,
      required: true
    },

    salt : {
      type: String,
      required: true
    },

    role : {
      type: String,
      required: true
    }
  }
);

const user = mongoose.createConnection(process.env.MONGO_DB_SRV + "User");

const userData = user.model("UserData", userDataSchema);

module.exports = userData;