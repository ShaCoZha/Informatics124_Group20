import React, { useState } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import styles from "./userProfileStyle.module.css"
import ProfileForm from './userProfileForm.jsx';

function userProfile() {

  return (
    
  <body className={styles.userProfileBody}>

    <Header></Header>
    <ProfileForm></ProfileForm>
    <Footer></Footer>
    
  </body>

  )
}

export default userProfile
