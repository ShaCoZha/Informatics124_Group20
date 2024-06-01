const ChatRepositories = require("../repositories/ChatRepositories");

async function getGroupChat(chatRoomId) {
    return await ChatRepositories.getGroupChat(chatRoomId);
}

async function saveGroupChat(roomId, messages) {
    return await ChatRepositories.saveGroupChat(roomId, messages);
}

async function getChatRoomInPage(page, offset) {
    return await ChatRepositories.getChatRoomInPage(page, offset);
}

async function getPrivateChatRoomInPage(page, offset, user) {
    return await ChatRepositories.getPrivateChatRoomInPage(page, offset, user);
}

async function getPrivateChat(userX, userY) {
    return await ChatRepositories.getPrivateChat(userX, userY);
}

async function getPrivateChatById(privateRoomId) {
    return await ChatRepositories.getPrivateChatById(privateRoomId);
}

async function savePrivateChat(privateRoomId, messages) {
    return await ChatRepositories.savePrivateChat(privateRoomId, messages);
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