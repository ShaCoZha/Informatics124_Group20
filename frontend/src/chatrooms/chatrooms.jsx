import React, { useState, useEffect } from "react";
import Header from "../header/header.jsx"
import Footer from "../footer/footer.jsx"
import styles from "./chatroomStyle.module.css"
import FriendList from "./chatList.jsx";
import ChatWindow from "./chatWindow.jsx";
import { io } from "socket.io-client";
import axios from 'axios';
const axiosApiInstance = axios.create();
import { setupAxiosInterceptors } from '../verifyToken.jsx';
setupAxiosInterceptors(axiosApiInstance);

function Chatrooms(){

    const [socket, setSocket] = useState(null);
    const [name, setName] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [roomId, setRoomId] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:3000");
        setSocket(socket)
        socket.on("receive_message", (data) => {
            setMessages(prevMessages => [...prevMessages, data])
        })
      }, []);

    async function fetchUserProfile() {
        try
        {
        const response = await axiosApiInstance.get('http://localhost:3000/user/getUserProfile', {
            withCredentials: true
        }
        );
    
        setName(response.data.name);
        setDisplayName(response.data.displayName);
        
        }
        catch(error)
        {
        console.log(error)
        }
    }
    fetchUserProfile()


    const handleChatConnection = (chat) => {
        console.log(`Connecting to chat room: ${chat}`);
        setRoomId(chat)
        socket.emit('joinRoom', chat);
        console.log(name, ' ', displayName)
      };

    const handleMessageSending = async (message) => {
        console.log("Message sent", message.authorId);
        await socket.emit("send_message", message)
    }

    const handleSwitchChat = () => {
        setMessages([]); 
      };

    return (

    <body className = {styles.ChatRooms}>
        <Header></Header>
            <div className = {styles.other_container}>
            <FriendList handleSwitchChat={handleSwitchChat} handleChatConnection={handleChatConnection}></FriendList>
            <ChatWindow socket={socket} messages={messages} setMessages={setMessages} roomId={roomId} name={name} displayName={displayName} handleMessageSending={handleMessageSending}></ChatWindow>
            </div>
        <Footer></Footer>
    </body>

    )
}

export default Chatrooms