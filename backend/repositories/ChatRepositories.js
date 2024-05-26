const groupChatData = require("../models/chat/groupChatModel");
const groupChatListData = require("../models/chat/groupChatListModel");

async function findGroupChat(chatRoomId) {
    try{
        const groupChat = await groupChatData.findOne({"roomId": chatRoomId});
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

async function getChatRoomInPage(page, offset) {
  if(page < 1)
  {
    page = 1;
  }

  const startIndex = (page - 1) * offset;
  const endIndex = startIndex + offset;

  try{
      const allRoom = await groupChatListData.findOne({"_id": "66526e69857ebc0264814d6a"});
      const roomsInPage = allRoom.groupChatList.slice(startIndex, endIndex);
      return roomsInPage;
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
            const allRoom = await groupChatListData.findOne({"_id": "66526e69857ebc0264814d6a"});
            if(allRoom.groupChatList.includes(chatRoomId))
            {
              const newChatRoom = await new groupChatData(
                { roomId: chatRoomId },
                { chatRoom: [] }
              ).save();
            }
            else
            {
              const error = new Error('Chat room does not exist');
              error.statusCode = 404;
              throw error;
            }
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

async function saveGroupChat(roomId, messages) {
  isThereRoom = await findGroupChat(roomId);
  try
  {
    if(isThereRoom)
    {
      await groupChatData.findOneAndUpdate(
        { roomId: roomId },
        { $push: { messages: { $each: messages } } }
      );
    }
    else
    {
      const allRoom = await groupChatListData.findOne({"_id": "66526e69857ebc0264814d6a"});
      if(allRoom.groupChatList.includes(roomId))
      {
        const newChatRoom = await new groupChatData(
          { roomId: roomId },
          { $push: { messages: { $each: messages } } }
        ).save();
      }
      else
      {
        const error = new Error('Chat room does not exist');
        error.statusCode = 404;
        throw error;
      }
    }
  }
  catch (error) {
    return error;
  }
}

module.exports = {
    getGroupChat,
    saveGroupChat,
    getChatRoomInPage
};