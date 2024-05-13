import React from 'react';
import styles from './header.module.css';
import { Link } from "react-router-dom";

const header = ({ }) => {
  
  return (
    <nav className={styles.nav}>
    <Link to="/"><img src="/UCI logo.png" alt="College Logo" className={styles.logo}></img></Link>
    <div className={styles.navLinks}>
        <a href="../schedule/schedule.html">Course Schedule</a>
        <a href="../chatroom/chatrooms.html">Chat Room</a>
        <a href="../about/about.html">About</a>
    </div>
    <a href="../profile/profile.html">
        <div className={styles.profilePicContainer}>
            <img src="/profile-pic.JPG" alt="Profile" className={styles.profilePic}></img>
        </div>
    </a>
    </nav>
  );
};

export default header;