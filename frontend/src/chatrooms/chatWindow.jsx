import React, { useState, useEffect } from "react";
import styles from "./chatWindowStyles.module.css"
import axios from 'axios';
const axiosApiInstance = axios.create();
import { setupAxiosInterceptors } from '../verifyToken.jsx';

function ChatWindow({ messages, setMessages, roomId, name, displayName, handleMessageSending }){

  const handleKeyDown = async (event) => {
      if(event.key == 'Enter'){
          event.preventDefault();
          const detected_input = event.target.value.trim();
          if(detected_input != '' && roomId !== ''){
              const messageData = {
                roomId: roomId,
                senderId: name,
                senderDisplayName: displayName,
                message: detected_input,
                timestamp: new Date(Date.now())
              }

              await handleMessageSending(messageData)
              setMessages([...messages, messageData]);
              event.target.value = '';
          }
      }
  };

    return (

      <div className={styles.main_window}>
      <div className = {styles.text_display}>
        {messages != null ? (
        messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${styles.blue_bg}`}>
            <div className={styles.message_sender}>{msg.senderDisplayName}</div>
            <div className={styles.message_text}>{msg.message}</div>
            <div className={styles.message_text}>
                {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : ""}
                </div>
            </div>
        ))
        ) : (
        <div className={styles.no_messages}></div>
        )}
      </div>
      <div className = {styles.type_in}>
          <input
              type = "text"
              id = "chat-input"
              placeholder= " Please type in your next message here and press return to send"
              onKeyDown={handleKeyDown}
          />
      </div>
  </div>

    )
}

export default ChatWindow