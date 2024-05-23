import React, { useState } from "react";
import styles from "./friendListStyle.module.css"

function ChatWindow({ messages, setMessages }){

  const handleKeyDown = (event) => {
      if(event.key == 'Enter'){
          event.preventDefault();
          const detected_input = event.target.value.trim();
          if(detected_input != ''){
              setMessages([...messages, detected_input]);
              event.target.value = '';
          }
      }
  };

    return (

      <div className={styles.main_window}>
      <div className = {styles.text_display}>
          {messages.map((msg, index) => (
              <div key = {index} className={`${styles.message} ${styles.blue_bg}`}>
                  <div className={styles.message_sender}>User</div>
                  <div className={styles.message_text}>{msg}</div>
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