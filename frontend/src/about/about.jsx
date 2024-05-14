import React, { useState } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import styles from "./aboutStyle.module.css"


function about() {

  return (
    
  <body className={styles.aboutBody}>

    <Header></Header>
    <section className={styles.about}>
            <h1>About Us</h1>
            <div className={styles.aboutInfo}>
                <p> 
                    Welcome to ZotPlan, a platform for effortless college scheduling and dynamic community engagement! <br />

                    Our platform is designed with one central goal: to streamline your college experience. 
                    Whether you're a freshman embarking on your academic journey or a seasoned senior fine-tuning your schedule,
                    our intuitive scheduling tool simplifies the process, allowing you to create personalized timetables. <br />
                    
                    We're also a vibrant community hub, allow you to connect among students from campuses far and wide.
                    With our integrated chat room feature, you can engage in lively discussions, 
                    seek advice from peers, share insights, and build lasting friendships—all.
                </p>
            </div>
            <div className={styles.siteContainer}>
                <a href = "../feedback"><button>Feedback</button></a>
            </div>
    </section>
    <Footer></Footer>
    
  </body>

  )
}

export default about
