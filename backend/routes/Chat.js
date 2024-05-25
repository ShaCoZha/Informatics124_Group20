const express = require("express");
const router = express.Router();

const chatController = require("../controllers/ChatController");

router.get('/getGroupChat', chatController.getGroupChat);
router.post('/saveGroupChat', chatController.saveGroupChat);

module.exports = router;