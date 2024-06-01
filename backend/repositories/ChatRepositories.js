const groupChatData = require("../models/chat/groupChatModel");
const groupChatListData = require("../models/chat/groupChatListModel");
const privateChatListData = require("../models/chat/privateChatModel");

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

async function findPrivateChat(userX, userY) {
  try{
    const privateChat = await privateChatListData.findOne({
      $and: [
         {$or: [
          {userOne: userX},
          {userTwo: userX}
        ]},
        {$or: [
          {userOne: userY},
          {userTwo: userY}
        ]}
      ]
  });

    if(privateChat == null)
    {
      return null;
    }
    else
    {
      return privateChat;
    }
  }
  catch (error) {
    return error;
  }
}

async function getPrivateChatRoomInPage(page, offset, user) {
  if(page < 1)
  {
    page = 1;
  }

  const startIndex = (page - 1) * offset;
  const endIndex = startIndex + offset;

  try{
    const privateChatInPage = await privateChatListData.find({
      $or: [
        { userOne: user },
        { userTwo: user }
      ]
    }).skip(startIndex).limit(offset);

      return privateChatInPage;
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
                { messages: [] }
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

async function getPrivateChat(userX, userY) {
  try{
      const privateChat = await findPrivateChat(userX, userY);
      if(privateChat == null)
      {
          const newPrivateChat = await new privateChatListData(
            {
             userOne: userX ,
             userTwo: userY ,
             messages: [] 
            }
          ).save();
          return newPrivateChat;
      }
        return privateChat;

    }
    catch (error) {
      return error;
    }
}

async function getPrivateChatById(privateRoomId) {
  try{
      const privateChat = await privateChatListData.findOne({"_id": privateRoomId});
      return privateChat;
    }
    catch (error) {
      return error;
    }
}

async function savePrivateChat(privateRoomId, messages) {
  try
  {
    const privateChat = await privateChatListData.findOne({"_id" : privateRoomId});
    if(privateChat)
    {
      await privateChatListData.findOneAndUpdate(
        { _id : privateRoomId},
        { $push: { messages: { $each: messages } } }
      );
    }
  }
  catch (error) {
    return error;
  }
}

async function saveGroupChat(roomId, messages) {
  try
  {
    isThereRoom = await findGroupChat(roomId);
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
    getChatRoomInPage,
    getPrivateChatRoomInPage,
    getPrivateChat,
    savePrivateChat,
    getPrivateChatById
};