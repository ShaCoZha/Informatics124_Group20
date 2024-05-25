const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    senderId : { 
        type: String, 
        required: true },

    message : { 
        type: String, 
        required: true },
        
    timestamp : { 
        type: Date, 
        default: Date.now }
  }, );


const groupChatSchema = mongoose.Schema(
  {
    chatId : { 
        type: String, 
        required: true, 
        unique: true },
        
        messages : [messageSchema]
  }
);

const group = mongoose.createConnection(process.env.MONGO_DB_SRV + "Group");

const groupChatData = group.model("GroupChatData", groupChatSchema);

module.exports = groupChatData;