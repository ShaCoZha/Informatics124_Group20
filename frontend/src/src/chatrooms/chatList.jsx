import React, { useState, useEffect  } from "react";
import styles from "./chatListStyle.module.css"
import CourseList from "./courseChatLists"
import FriendList from "./friendList"

function ChatList( { handleSwitchChat, handleChatConnection, selectedList, changeSelectedList, friendList, setFriendList, name, setPrivateRoomId, activeChat, setActiveChat, chatRooms, setChatRooms} ){
    
    const [filteredChatRooms, setFilteredChatRooms] = useState(chatRooms);
    const [filteredFriendList, setFilteredFriendList] = useState(friendList);

    useEffect(() => {
        setFilteredChatRooms(chatRooms);
      }, [chatRooms]);
    
      useEffect(() => {
        setFilteredFriendList(friendList);
      }, [friendList]);
    
    const handleKeyDown = async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const detected_input = event.target.value.trim().toLowerCase();
        if (detected_input !== "") {
          if (selectedList === "1") {
            setFilteredChatRooms(
              chatRooms.filter((room) =>
                room.name.toLowerCase().includes(detected_input)
              )
            );
          } else {
            setFilteredFriendList(
              friendList.filter((friend) =>
                friend.name.toLowerCase().includes(detected_input)
              )
            );
          }
        } else {
          // If input is empty, reset the list to show all items
          setFilteredChatRooms(chatRooms);
          setFilteredFriendList(friendList);
        }
      }
    };
    return (

    <body className = {styles.side_bar}>
      <div className = {styles.sidebar_search}>
                        <input type = "text" placeholder=" Search Chat, press enter to commit/reset" onKeyDown={handleKeyDown} />
                    </div>
                    <div className = { styles.chat_list}>
                        {selectedList === "1" ? (
                            <CourseList handleSwitchChat={handleSwitchChat} handleChatConnection={handleChatConnection} changeSelectedList={changeSelectedList} activeChat = {activeChat} setActiveChat = {setActiveChat} chatRooms = {filteredChatRooms} setChatRooms = {setChatRooms}/>
                        ) : (
                            <FriendList handleSwitchChat={handleSwitchChat} handleChatConnection={handleChatConnection} friendList = {filteredFriendList} setFriendList = {setFriendList} name = {name} setPrivateRoomId = {setPrivateRoomId} activeChat = {activeChat} setActiveChat = {setActiveChat}/>
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