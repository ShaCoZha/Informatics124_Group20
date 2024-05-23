import React, { useState } from "react";
import styles from "./friendListStyle.module.css"
import CourseList from "./courseChatLists"

function FriendList( { handleSwitchChat } ){

    const [activeChat, setActiveChat ] = useState(0);

    return (

    <body className = {styles.side_bar}>
      <div className = {styles.sidebar_search}>
                        <input type = "text" placeholder=" Search Chat" />
                    </div>
                    <div className = { styles.chat_list}>
                        <CourseList handleSwitchChat={handleSwitchChat}></CourseList>
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