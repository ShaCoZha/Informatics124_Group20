import React, { useState } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import styles from "./userProfileChangeStyle.module.css"
import ProfileChangeForm from './userProfileChangeForm.jsx';
import ProfilePic from './userProfilePic.jsx';

function userProfile() {

  return (
    
  <body className={styles.userProfileChangeBody}>

    <Header></Header>
    <body className={styles.centerContent}>
      <ProfilePic className={styles.picContainer}></ProfilePic>
      <ProfileChangeForm className={styles.profileContainer}></ProfileChangeForm>
    </body>
    <Footer></Footer>
    
  </body>

  )
}

export default userProfile
