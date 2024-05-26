const ChatService = require("../services/ChatService");

module.exports = {

  getGroupChat : async (req, res) => {
    const result = await ChatService.getGroupChat(req.body.roomId);
    if (result instanceof Error)
    {
      res.status(401).send(result.stack);
      return;
    }
    res.status(201).send(result);
    return;
  },

  getChatRoomInPage : async (req, res) => {
    const page = parseInt(req.query.page);
    const offset = parseInt(req.query.offset);
    const result = await ChatService.getChatRoomInPage(page, offset);
    if (result instanceof Error)
    {
      res.status(401).send(result.stack);
      return;
    }
    res.status(201).send(result);
    return;
  },

  saveGroupChat : async (req, res) => {
    const result = await ChatService.saveGroupChat(req.body.roomId, req.body.messages);
    if (result instanceof Error)
    {
      res.status(401).send(result.stack);
      return;
    }
    res.status(201).send(result);
    return;
  }


};