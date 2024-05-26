const ChatRepositories = require("../repositories/ChatRepositories");

async function getGroupChat(chatRoomId) {
    return await ChatRepositories.getGroupChat(chatRoomId);
}

async function saveGroupChat(roomId, messages) {
    return await ChatRepositories.saveGroupChat(roomId, messages);
}

async function saveGroupChat(roomId, messages) {
    return await ChatRepositories.saveGroupChat(roomId, messages);
}

async function getChatRoomInPage(page, offset) {
    return await ChatRepositories.getChatRoomInPage(page, offset);
}

module.exports = {
    getGroupChat,
    saveGroupChat,
    getChatRoomInPage
};