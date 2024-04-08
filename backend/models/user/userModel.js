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

mongoose.connect(process.env.MONGO_DB_SRV + "User");

const userData = mongoose.model("userData", userDataSchema);

module.exports = userData;