const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    senderId : { 
        type: String, 
        required: true },

    senderDisplayName : { 
        type: String, 
        required: true },

    message : { 
        type: String, 
        required: true },
        
    timestamp : { 
        type: Date, 
        default: Date.now }
  }, );


const privateChatSchema = mongoose.Schema(
  {
    userOne : { 
        type: String, 
        required: true, },

    userTwo : { 
        type: String, 
        required: true, },
        
    messages : [messageSchema]
  }
);

const private = mongoose.createConnection(process.env.MONGO_DB_SRV + "Private");

const privateChatData = private.model("PrivateChatData", privateChatSchema);

module.exports = privateChatData;