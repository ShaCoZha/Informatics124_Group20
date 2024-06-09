import React, { useState, useEffect } from "react";
import styles from "./courseChatListsStyles.module.css"
import ChatWindow from "./chatWindow"
import axios from 'axios';
const axiosApiInstance = axios.create();
import { setupAxiosInterceptors } from '../verifyToken.jsx';
setupAxiosInterceptors(axiosApiInstance);

function CourseList( { handleChatConnection, activeChat, setActiveChat, chatRooms, setChatRooms} ){

    useEffect(() => {
        async function getChatList(page, offset)
        {
            const response = await axiosApiInstance.get('http://localhost:3000/chat/getChatRoomInPage', {
                withCredentials: true,
                params : {
                    page : page,
                    offset : offset
                }
            });

            const updatedRooms = response.data.map(room => ({
                name: room,
                imgSrc: '/chatroomone.JPG' // To be Replaced?
            }));

            setChatRooms(updatedRooms);
        }

        getChatList(1,10) //page and offset
    }, []);
    

    return (

      <div className = {styles.courseList_list}>
      {chatRooms.map((chat, index) => (
          <div
              key = {chat.name}
              className = {`${styles.chatblock} ${index === activeChat ? styles.active : ''}`}
              onClick = {() => {setActiveChat(index), handleChatConnection(chat.name)}}
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