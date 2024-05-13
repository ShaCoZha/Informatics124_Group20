import  styles from './registerStyle.module.css'
import React, { useState } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import RegForm from './registerForm.jsx';
import {Link} from 'react-router-dom'
import axios from 'axios';

function register() {

  return (
    
    <body className={styles.registerBody}>

    <Header></Header>
    <RegForm></RegForm>
    <Footer></Footer>
    
  </body>

  )
}

export default register
