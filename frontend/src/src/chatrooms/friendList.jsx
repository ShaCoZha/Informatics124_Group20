import React, { useState, useEffect } from "react";
import styles from "./friendListStyles.module.css"
import axios from 'axios';
const axiosApiInstance = axios.create();
import { setupAxiosInterceptors } from '../verifyToken.jsx';
import {getDisPlayName, getProfileColor} from './userProfileGetter.jsx';

setupAxiosInterceptors(axiosApiInstance);

function FriendList( { handleChatConnection, friendList, setFriendList, name, setPrivateRoomId, activeChat, setActiveChat} ){

    useEffect(() => {
        async function getChatList(page, offset)
        {
            try
            {
              const response = await axiosApiInstance.get('http://localhost:3000/chat/getPrivateChatRoomInPage', {
                withCredentials: true,
                params : {
                    page : page,
                    offset : offset,
                    user : name
                }
              });

              const updatedRooms = await Promise.all(response.data.map(async privateChat => ({
                name: privateChat.userOne === name? privateChat.userTwo:privateChat.userOne ,
                chatIds : privateChat._id,
                displayName : await getDisPlayName(privateChat.userOne === name? privateChat.userTwo:privateChat.userOne),
                color : await getProfileColor(privateChat.userOne === name? privateChat.userTwo:privateChat.userOne)
              })));

              await setFriendList(updatedRooms);
            } catch(error)
            {
              return error
            }

        }

        getChatList(1,3) //page and offset
    }, []);

    const [chatRooms, setChatRooms ] = useState([]);

    return (

      <div className = {styles.courseList_list}>
      {friendList.map((chat, index) => (
          <div
              key = {chat.name}
              className = {`${styles.chatblock} ${index === activeChat ? styles.active : ''}`}
              onClick = {() => {setActiveChat(index), handleChatConnection(chat.chatIds), setPrivateRoomId(chat.chatIds)}}
          >
              <div className={styles.profilePicContainer} id = {chat.displayName} style={{backgroundColor: chat.color}}> 
                {chat.displayName.charAt(0)} 
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

export default FriendList