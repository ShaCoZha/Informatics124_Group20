import React, { useState } from "react";
import styles from "./chatListStyle.module.css"
import CourseList from "./courseChatLists"
import FriendList from "./friendList"

function ChatList( { handleSwitchChat, handleChatConnection, selectedList, changeSelectedList, friendList, setFriendList, name, setPrivateRoomId, activeChat, setActiveChat, chatRooms, setChatRooms} ){
    

    return (

    <body className = {styles.side_bar}>
      <div className = {styles.sidebar_search}>
                        <input type = "text" placeholder=" Search Chat" />
                    </div>
                    <div className = { styles.chat_list}>
                        {selectedList === "1" ? (
                            <CourseList handleSwitchChat={handleSwitchChat} handleChatConnection={handleChatConnection} changeSelectedList={changeSelectedList} activeChat = {activeChat} setActiveChat = {setActiveChat} chatRooms = {chatRooms} setChatRooms = {setChatRooms}/>
                        ) : (
                            <FriendList handleSwitchChat={handleSwitchChat} handleChatConnection={handleChatConnection} friendList = {friendList} setFriendList = {setFriendList} name = {name} setPrivateRoomId = {setPrivateRoomId} activeChat = {activeChat} setActiveChat = {setActiveChat}/>
                        )}
                    </div>
                    <div className={styles.choice_bar}> 
                        <ul className={styles.chat_sections}>
                            <li className= {`${styles.list} ${selectedList === "1" ? styles.active : ''}`} onClick={() => {changeSelectedList("1"), setActiveChat(-1)}}>Chatrooms</li>
                            <li className= {`${styles.list} ${selectedList === "0" ? styles.active : ''}`} onClick={() => {changeSelectedList("0"), setActiveChat(-1)}}>Friends</li>
                        </ul>
       </div>
    </body>

    )
}

export default ChatList