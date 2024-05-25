const groupChatData = require("../models/chat/groupChatModel");
const groupChatListData = require("../models/chat/groupChatListModel");

async function findGroupChat(chatRoomId) {
    try{
        const groupChat = await groupChatData.findOne({"chatId": chatRoomId});
        if(groupChat == null)
        {
          return null;
        }
        else
        {
          return groupChat;
        }
      }
      catch (error) {
        return error;
      }
}

async function getGroupChat(chatRoomId) {
    try{
        const groupChat = await findGroupChat(chatRoomId);
        if(groupChat == null)
        {
          return null;
        }
        else
        {
          return groupChat;
        }
      }
      catch (error) {
        return error;
      }
}

async function saveGroupChat(chatRoomId) {
    try{
        const groupChat = await groupChatListData.findOne({"_id": "664fae72861d563a17d0627b"});
        if(groupChat.groupChatList.includes(chatRoomId))
        {
            console.log(true)
        }
        else
        {
            console.log(false)
        }
      }
      catch (error) {
      }
}

module.exports = {
    getGroupChat,
    saveGroupChat
};