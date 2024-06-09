import React, { useState, useEffect } from "react";
import styles from "./profilePicStyle.module.css"
import axios from 'axios';
const axiosApiInstance = axios.create();
import { setupAxiosInterceptors } from '../verifyToken.jsx';
import {getDisPlayName, getProfileColor} from './userProfileGetter.jsx';


function ProfilePic({ senderDisplayName, senderName, changeSelectedList, handleChatConnection, name, setActiveChat, friendList, setPrivateRoomId, setMessages, setFriendList, chatRooms, setRoomId}){

  const [profileColor, setProfileColor] = useState('');
  
  const fetchProfileColor = async () => {
    setProfileColor(await getProfileColor(senderName));
  };

  useEffect(() => {
    fetchProfileColor();
  }, []);

    async function handelClick(target)
    {
      try
      {
        var updatedRooms
        setActiveChat(-1)
        setRoomId(-1)
        changeSelectedList("0");

        const targetUser = await handelGetPrivateChatRoom(target)

        const targetUserForFriendList = {
          name: targetUser.userOne === name? targetUser.userTwo:targetUser.userOne ,
          chatIds : targetUser._id,
          displayName : await getDisPlayName(targetUser.userOne === name? targetUser.userTwo:targetUser.userOne),
          color : await getProfileColor(targetUser.userOne === name? targetUser.userTwo:targetUser.userOne)
        }


            try
            {
              const response = await axiosApiInstance.get('http://localhost:3000/chat/getPrivateChatRoomInPage', {
                withCredentials: true,
                params : {
                    page : 1,
                    offset : 100,
                    user : name
                }
              });

              updatedRooms = await Promise.all(response.data.map(async privateChat => ({
                name: privateChat.userOne === name? privateChat.userTwo:privateChat.userOne ,
                chatIds : privateChat._id,
                displayName : await getDisPlayName(privateChat.userOne === name? privateChat.userTwo:privateChat.userOne),
                color : await getProfileColor(privateChat.userOne === name? privateChat.userTwo:privateChat.userOne)
              })));

              setFriendList(updatedRooms)
            } catch(error)
            {
              return error
            }

            updatedRooms.map( (userObject, index) => (
              userObject.name === target? (setActiveChat(index), setPrivateRoomId(userObject.chatIds)) : ""
           ))

        
      }catch(error)
      {
        console.log(error)
        return error
      }
    }

    async function handelGetPrivateChatRoom(target)
    {
      try
      {
        const response = await axiosApiInstance.post('http://localhost:3000/chat/getPrivateChat', {
          userOne : name,
          userTwo : senderName
          }, {
            withCredentials: true
          }
        );
  
        setMessages(response.data.messages)
        handleChatConnection(response.data._id)
        return response.data
      }catch(error)
      {
        return error
      }
      
    }

    //NOTE: Need new function handleChatConnection to handle user instead of groupchat
    return (
        <div className={styles.profilePicContainer} id = {senderName} style={{backgroundColor: profileColor}} onClick={() => { name != senderName? handelClick(senderName) : '' }}> 
        {senderDisplayName.charAt(0)} 
        </div>
    )
}

export default ProfilePic