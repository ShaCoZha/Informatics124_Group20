import React, { useState } from "react";
import Header from "../header/header.jsx"
import Footer from "../footer/footer.jsx"
import styles from "./chatroomStyle.module.css"
import FriendList from "./friendList.jsx";
import ChatWindow from "./chatWindow.jsx";

function Chatrooms(){

    const [messages, setMessages] = useState([]);

    const handleSwitchChat = () => {
        setMessages([]); 
      };

    return (

    <body className = {styles.ChatRooms}>
        <Header></Header>
            <div className = {styles.other_container}>
            <FriendList handleSwitchChat={handleSwitchChat}></FriendList>
            <ChatWindow messages={messages} setMessages={setMessages}></ChatWindow>
            </div>
        <Footer></Footer>
    </body>

    )
}

export default Chatrooms