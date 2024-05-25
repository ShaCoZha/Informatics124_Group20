import React, { useState, useEffect } from "react";
import styles from "./chatWindowStyles.module.css"

function ChatWindow({ messages, setMessages, roomId, name, displayName, handleMessageSending }){

  const handleKeyDown = async (event) => {
      if(event.key == 'Enter'){
          event.preventDefault();
          const detected_input = event.target.value.trim();
          if(detected_input != '' && roomId !== ''){
              const messageData = {
                room: roomId,
                authorId: name,
                authorDisplayName: displayName,
                message: detected_input,
                time: new Date(Date.now())
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
          {messages.map((msg, index) => (
              <div key = {index} className={`${styles.message} ${styles.blue_bg}`}>
                  <div className={styles.message_sender}>{msg.authorDisplayName}</div>
                  <div className={styles.message_text}>{msg.message}</div>
                  
              </div>
          ))}
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