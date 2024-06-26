const mongoose = require('mongoose');

const userProfileSchema = mongoose.Schema(
  {
    name : {
      type: String,
      required: true
    },

    displayName : {
      type: String,
      default: ""
    },

    year : {
      type: String,
      default: ""
    },

    department : {
      type: String,
      default: ""
    },

    major : {
      type: String,
      default: ""
    }
  }
);

mongoose.connect(process.env.MONGO_DB_SRV + "User");

const userProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = userProfile;