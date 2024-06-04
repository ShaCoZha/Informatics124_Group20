import React, { useState } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import styles from "./find_friendsStyle.module.css"


function find_friends() {

  const handleSearchClick = () => {
  };

  return (
    
  <body className={styles.aboutBody}>

    <Header></Header>
    <h1>Click To Search For Similar Schedules!</h1>
    <h2>This application will display a list of users with two or more similar events with you. </h2>
    <div className={styles.siteContainer}>
                <a><button onClick={handleSearchClick}>Find Friends!</button></a>
    </div>
    <Footer></Footer>
  </body>

  )
}

export default find_friends
