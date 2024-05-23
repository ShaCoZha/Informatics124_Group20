import React, { useState } from "react";
import styles from "./courseChatListsStyles.module.css"
import ChatWindow from "./chatWindow"

function CourseList( { handleSwitchChat } ){

    const chatRooms = [
        { name: 'INF 124', imgSrc: '/chatroomone.JPG' },
        { name: 'ICS 146', imgSrc: '/chatroomtwo.JPG' },
        { name: 'INF 115', imgSrc: '/chatroomthree.JPG' },
        { name: 'INF 121', imgSrc: '/chatroomfour.JPG' },
        { name: 'INF 123', imgSrc: '/chatroomfour.JPG' }
    ];

    const [activeChat, setActiveChat ] = useState(0);

    return (

      <div className = {styles.courseList_list}>
      {chatRooms.map((chat, index) => (
          <div
              key = {chat.name}
              className = {`${styles.chatblock} ${index === activeChat ? styles.active : ''}`}
              onClick = {() => {handleSwitchChat(), setActiveChat(index), console.log(chat)}}
          >
              <div className = {styles.chat_img}>
                  <img src = {chat.imgSrc} className={styles.cover} alt = {chat.name} />
              </div>
              <div className={styles.chatinfo}>
                  <div className = {styles.chatname}>
                      <h4>{chat.name}</h4>
                  </div>
              </div>
          </div>
      ))}
    </div>


    )
}

export default CourseList