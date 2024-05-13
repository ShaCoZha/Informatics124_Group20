import React, { useState } from 'react';
import axios from 'axios';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import styles from './userProfileFormStyle.module.css';

function UserProfileForm() {

    const [name, setName] = useState('s')
    const [year, setyear] = useState('')
    const [department, setDepartment] = useState('')
    const [major, setMajor] = useState('')


  return (

    <div className={styles.centerContainer}>

            <h2><label className={styles.word}>Profile</label></h2> 

            <div className={styles.form}> 
       
             <div className={styles.displayField}> 
               <label className={styles.word}><b>Name</b></label>
               <span className={styles.display}>{name}</span>
             </div> 

             <div className={styles.displayField}> 
              <label className={styles.word}><b>Year</b></label>
              <span className={styles.display}>{year}</span> 
            </div> 

            <div className={styles.displayField}> 
              <label className={styles.word}><b>Department</b></label>
              <span className={styles.display}>{department}</span>
            </div> 

            <div className={styles.displayField}> 
              <label className={styles.word}><b>Major</b></label>
              <span className={styles.display}>{major}</span>
            </div> 
       
             <div className={styles.change}>
              <a href="../profile_change/profileChange.html" className={styles.buttonLink}>
                <button type="submit">Change profile</button>
              </a>
             </div> 
       
            </div> 

    </div>

  )
}

export default UserProfileForm
