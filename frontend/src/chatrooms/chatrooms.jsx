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
import { ScrollRestoration, useNavigate } from 'react-router-dom';

function Chatrooms(){
    const navigate = useNavigate();

    const [socket, setSocket] = useState(null);
    const [name, setName] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [roomId, setRoomId] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchUserProfile()
        const socket = io("http://localhost:3000");
        setSocket(socket)
        socket.on("receive_message", (data) => {
            setMessages(prevMessages => [...prevMessages, data])
        })

        return () => {
            socket.disconnect();
        };
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
            navigate('/login');
        }
    }

    useEffect(() => {
        if(roomId)
            {
                handleSwitchChat();
            }
    }, [roomId]); 


    const handleChatConnection = async (chat) => {
        await setRoomId(chat)
        socket.emit('joinRoom', chat);
      };

    const handleMessageSending = async (message) => {
        try
            {
            const response = await axiosApiInstance.post('http://localhost:3000/chat/saveGroupChat', {
                roomId: roomId,
                messages: [{
                    senderId: message.senderId,
                    senderDisplayName: message.senderDisplayName,
                    message: message.message,
                    timestamp: message.timestamp
                }]
            }, {
                    withCredentials: true
            }
            );
                setMessages(response.data.messages)
                await socket.emit("send_message", message)
            }
            catch(error)
            {
                console.log(error)
            }
    }

    const handleSwitchChat = async() => {
        setMessages([]); 
        try
        {
            const response = await axiosApiInstance.post('http://localhost:3000/chat/getGroupChat', {
                roomId: roomId,
            }, {
            withCredentials: true
            }
            );
            setMessages(response.data.messages)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return (

    <body className = {styles.ChatRooms}>
        <Header></Header>
            <div className = {styles.other_container}>
            <FriendList handleChatConnection={handleChatConnection}></FriendList>
            <ChatWindow socket={socket} messages={messages} setMessages={setMessages} roomId={roomId} name={name} displayName={displayName} handleMessageSending={handleMessageSending}></ChatWindow>
            </div>
        <Footer></Footer>
    </body>

    )
}

export default Chatrooms