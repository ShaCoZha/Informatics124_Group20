import React, { useState } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import styles from "./userProfileChangeStyle.module.css"
import ProfileChangeForm from './userProfileChangeForm.jsx';

function userProfile() {

  return (
    
  <body className={styles.userProfileChangeBody}>

    <Header></Header>
    <ProfileChangeForm></ProfileChangeForm>
    <Footer></Footer>
    
  </body>

  )
}

export default userProfile
