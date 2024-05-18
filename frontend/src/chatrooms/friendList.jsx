import React, { useState } from "react";
import styles from "./friendListStyle.module.css"

function FriendList(){

    const chatRooms = [
        { name: 'INF 124', imgSrc: '/chatroomone.JPG' },
        { name: 'ICS 146', imgSrc: '/chatroomtwo.JPG' },
        { name: 'INF 115', imgSrc: '/chatroomthree.JPG' },
        { name: 'INF 121', imgSrc: '/chatroomfour.JPG' }
    ];

    const [activeChat, setActiveChat ] = useState(0);
    const [messages, setMessages] = useState([]);

    const handleSwitchChat = (index) => {
        setActiveChat(index);
        setMessages([]);
    };

    return (

    <body className = {styles.side_bar}>
      <div className = {styles.sidebar_search}>
                        <input type = "text" placeholder=" Search Chat" />
                    </div>
                    <div className = { styles.chat_list}>
                        {chatRooms.map((chat, index) => (
                            <div
                                key = {index}
                                className = {`${styles.chatblock} ${index === activeChat ? styles.active : ''}`}
                                onClick = {() => handleSwitchChat(index)}
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
                    <div className={styles.choice_bar}> 
                        <ul className={styles.chat_sections}>
                            <li className={styles.chosen}>Chatrooms</li>
                            <li>Friends</li>
                        </ul>
       </div>
    </body>

    )
}

export default FriendList