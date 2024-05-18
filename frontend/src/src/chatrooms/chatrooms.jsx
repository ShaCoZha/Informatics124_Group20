import React, { useState } from "react";
import Header from "../header/header.jsx"
import Footer from "../footer/footer.jsx"
import styles from "./chatroomStyle.module.css"

function Chatrooms(){

    const chatRooms = [
        { name: 'INF 124', imgSrc: '../public/chatroomone.JPG' },
        { name: 'ICS 146', imgSrc: '../public/chatroomtwo.JPG' },
        { name: 'INF 115', imgSrc: '../public/chatroomthree.JPG' },
        { name: 'INF 121', imgSrc: '../public/chatroomfour.JPG' }
    ];

    const [activeChat, setActiveChat ] = useState(0);
    const [messages, setMessages] = useState([]);

    const handleSwitchChat = (index) => {
        setActiveChat(index);
        setMessages([]);
    };

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

    <body className = {styles.ChatRooms}>
        <Header></Header>
            <div className = {styles.other_container}>
                <div className = {styles.side_bar}>
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
                </div>

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
            </div>
        <Footer></Footer>
    </body>

    )
}

export default Chatrooms