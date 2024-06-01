import React, { useState, useEffect } from "react";
import Header from "../header/header.jsx"
import Footer from "../footer/footer.jsx"
import styles from "./chatroomStyle.module.css"
import ChatList from "./chatList.jsx";
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
    const [privateRoomId, setPrivateRoomId] = useState('')
    const [messages, setMessages] = useState([]);
    const [selectedList, changeSelectedList ] = useState("1");
    const [friendList, setFriendList ] = useState([]);
    const [chatRooms, setChatRooms ] = useState([]);
    const [activeChat, setActiveChat ] = useState(-1);

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
        if(roomId && roomId != -1)
            {
                handleSwitchChat();
            }
    }, [roomId]); 

    useEffect(() => {
        if(privateRoomId && privateRoomId!= -1)
            {
                handleSwitchChat();
            }
    }, [privateRoomId]); 


    const handleChatConnection = async (chat) => {
        await setRoomId(chat)
        socket.emit('joinRoom', chat);
      };

    const handleMessageSending = async (message) => {
        try
            {
                var response
                if(selectedList == 1)
                 {
                    response = await axiosApiInstance.post('http://localhost:3000/chat/saveGroupChat', {
                        roomId: roomId,
                        messages: [{
                            senderId: message.senderId,
                            senderDisplayName: message.senderDisplayName,
                            message: message.message,
                            timestamp: message.timestamp
                        }]
                    }, {
                            withCredentials: true
                    })
                }
                else
                {

                    response = await axiosApiInstance.post('http://localhost:3000/chat/savePrivateChat', {
                        privateRoomId: privateRoomId,
                        messages: [{
                            senderId: message.senderId,
                            senderDisplayName: message.senderDisplayName,
                            message: message.message,
                            timestamp: message.timestamp
                        }]
                    }, {
                            withCredentials: true
                    })
                    console.log(privateRoomId);
                }
            
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
            var response
            if(selectedList == 1)
            {
                response = await axiosApiInstance.post('http://localhost:3000/chat/getGroupChat', {
                    roomId: roomId,
                }, {
                    withCredentials: true
                }
                );
            }
            else
            {
                response = await axiosApiInstance.get('http://localhost:3000/chat/getPrivateChatById', {
                    params : {
                        privateRoomId: privateRoomId,
                    }
                }, {
                    withCredentials: true
                }
                );
            }

            if(response)
                {
                    setMessages(response.data.messages)
                }
            
        }
        catch(error)
        {
            console.log(error)
        }
    }

    const newPrivateChat = (targetUserId) => {

    }

    return (

    <body className = {styles.ChatRooms}>
        <Header></Header>
            <div className = {styles.other_container}>
            <ChatList handleChatConnection={handleChatConnection} selectedList={selectedList} changeSelectedList={changeSelectedList} friendList = {friendList} setFriendList = {setFriendList} name = {name} setPrivateRoomId = {setPrivateRoomId} activeChat = {activeChat} setActiveChat = {setActiveChat} chatRooms = {chatRooms} setChatRooms = {setChatRooms}></ChatList>
            <ChatWindow socket={socket} messages={messages} setMessages={setMessages} roomId={roomId} name={name} displayName={displayName} handleMessageSending={handleMessageSending} changeSelectedList={changeSelectedList} handleChatConnection = {handleChatConnection} setActiveChat = {setActiveChat} friendList = {friendList} setPrivateRoomId = {setPrivateRoomId}
            setFriendList = {setFriendList} chatRooms = {chatRooms} setRoomId = {setRoomId}></ChatWindow>
            </div>
        <Footer></Footer>
    </body>

    )
}

export default Chatrooms