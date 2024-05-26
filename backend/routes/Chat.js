const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/TokenController");

const chatController = require("../controllers/ChatController");

router.post('/getGroupChat', chatController.getGroupChat);
router.post('/saveGroupChat', chatController.saveGroupChat);
router.get('/getChatRoomInPage', chatController.getChatRoomInPage);

module.exports = router;