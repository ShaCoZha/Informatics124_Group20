const ChatService = require("../services/ChatService");

module.exports = {

  getGroupChat : async (req, res) => {
    const result = await ChatService.getGroupChat(req.chatRoomId);
    if (result instanceof Error)
    {
      res.status(401).send(result.stack);
      return;
    }
    res.status(201).send(result);
    return;
  },

  saveGroupChat : async (req, res) => {
    const result = await ChatService.saveGroupChat(req.body.chatRoomId);
    console.log(req.body.chatRoomId)
    if (result instanceof Error)
    {
      res.status(401).send(result.stack);
      return;
    }
    res.status(201).send(result);
    return;
  }


};