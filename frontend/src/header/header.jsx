import React, { useState, useEffect } from 'react';
import styles from './header.module.css';
import { Link } from "react-router-dom";
import axios from 'axios';
const axiosApiInstance = axios.create();
import { setupAxiosInterceptors } from '../verifyToken.jsx';

const header = ({ }) => {

  const [user, setUser] = useState(null);
  const [profileColor, setProfileColor] = useState('');

  async function getProfile() {
    try{
      const profile = await axiosApiInstance.get('http://localhost:3000/user/getUserProfile', {
          withCredentials: true,
          });
      return profile.data;
    }catch(error)
    {
    }
    }

    useEffect(() => {
      getProfile().then(async function () {
        const userProfile = await getProfile();
        setUser(userProfile);
        setProfileColor(userProfile.profilePicture)
      })
        
      return () => {
      };
    }, []);

  
  return (
    <nav className={styles.nav}>
    <Link to="/"><img src="/UCI logo.png" alt="College Logo" className={styles.logo}></img></Link>
    <div className={styles.navLinks}>
        <a href="../schedule">Course Schedule</a>
        <a href="../chatrooms">Chat Room</a>
        <a href="../about">About</a>
    </div>
    <a className = {styles.linkToProf} href="../userProfile">
        <div className={styles.profilePicContainer} style={{backgroundColor: profileColor}}>
          {user == null? "" : user.displayName.charAt(0)}
        </div>
    </a>
    </nav>
  );
};

export default header;