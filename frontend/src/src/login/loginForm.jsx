import React, { useState } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import styles from './loginFormStyle.module.css';

function login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
  
    axios.interceptors.request.use(
      (config) => {
        config.withCredentials = true
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  
    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        name: username,
        password: password
      }, {
        withCredentials: true
      }
      );

      navigate('/userProfile')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.alert('Invalid username or password')
      } 
      else {
        window.alert('An error occurred. Please try again later.')
      }
    }
  
  }

  const toRegister = () => {
    navigate('/register'); // Redirect to the /register route
  };

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    
  <body>

    <div className={styles.centerContainer}>
      <div className={styles.signIn}> 

          <div className={styles.form}> 
            <h2><label className={styles.word}>Sign In</label></h2>
      
            <div className={styles.inputBox}> 
              <label className={styles.word}><b>Username</b></label>
              <input type="text" id={styles.uname} value = {username} onChange={(e) => setUsername(e.target.value)} required></input>
            </div> 
      
            <div className={styles.inputBox}> 
              <label className={styles.word}><b>Password</b></label>
            <input type="password" id={styles.pwd} value = {password} onChange={(e) => setPassword(e.target.value)} required></input>
            </div> 
      
            <div className={styles.loginButton}> 
            <button type="submit" onClick={() => handleLogin()} >Login</button>
            </div> 

            <div className={styles.loginButton}> 
              <button type="submit" onClick={() => toRegister()}>Register</button>
             </div> 

      
          </div> 
      </div>
    </div> 


  </body>

  )
}

export default login
