import React, { useState } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import LoginForm from "./loginForm.jsx"
import styles from "./loginStyle.module.css"

function login() {

  return (
    
  <body className={styles.loginBody}>

    <Header></Header>
    <LoginForm></LoginForm>
    <Footer></Footer>
    
  </body>

  )
}

export default login
