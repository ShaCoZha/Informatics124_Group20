const ChatRepositories = require("../repositories/ChatRepositories");

async function getGroupChat(chatRoomId) {
    return await ChatRepositories.getGroupChat(chatRoomId);
}

async function saveGroupChat(chatRoomId) {
    return await ChatRepositories.saveGroupChat(chatRoomId);
}

module.exports = {
    getGroupChat,
    saveGroupChat,

};