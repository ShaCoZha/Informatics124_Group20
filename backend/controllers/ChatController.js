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

  getPrivateChatById : async (req, res) => {
    const result = await ChatService.getPrivateChatById(req.query.privateRoomId);
    if (result instanceof Error)
    {
      res.status(401).send(result.stack);
      return;
    }
    res.status(201).send(result);
    return;
  },

  getPrivateChat : async (req, res) => {
    const result = await ChatService.getPrivateChat(req.body.userOne, req.body.userTwo);
    if (result instanceof Error)
    {
      res.status(401).send(result.stack);
      return;
    }
    res.status(201).send(result);
    return;
  },

  getPrivateChatRoomInPage : async (req, res) => {
    const page = parseInt(req.query.page);
    const offset = parseInt(req.query.offset);
    const userName = req.query.user;
    const result = await ChatService.getPrivateChatRoomInPage(page, offset, userName);
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
  },

  savePrivateChat : async (req, res) => {
    const result = await ChatService.savePrivateChat(req.body.privateRoomId, req.body.messages);
    if (result instanceof Error)
    {
      res.status(401).send(result.stack);
      return;
    }
    res.status(201).send(result);
    return;
  },


};