import React, { useState } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import styles from "./feedbackStyle.module.css"
import FeedbackForm from './feedbackForm.jsx';


function about() {

  return (
    
  <body className={styles.feedbackBody}>

    <Header></Header>
    <FeedbackForm></FeedbackForm>
    <Footer></Footer>
    
  </body>

  )
}

export default about
