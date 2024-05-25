const mongoose = require('mongoose');

const groupChatListSchema = mongoose.Schema(
  {
    groupChatList : [String]
  }
);

const group = mongoose.createConnection(process.env.MONGO_DB_SRV + "Group");

const groupChatListData = group.model("GroupChatListData", groupChatListSchema);

module.exports = groupChatListData;