import React, { useState } from 'react';
import axios from 'axios';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import styles from './userProfileChangeFormStyle.module.css';
const axiosApiInstance = axios.create();
import { setupAxiosInterceptors } from '../verifyToken.jsx';
setupAxiosInterceptors(axiosApiInstance);


function UserProfileChangeForm() {

    const [name, setName] = useState('s')
    const [year, setyear] = useState('')
    const [department, setDepartment] = useState('')
    const [major, setMajor] = useState('')

  return (
    
      <div className={styles.centerContainer}>
        <div className={styles.signIn}> 
            <h2><label className={styles.word}>Profile</label></h2> 

            <div className={styles.form}> 
       
             <div className={styles.inputBox}> 
               <label className={styles.word}><b>Name</b></label>
               <input type="text" id="displayName" required></input>
             </div> 

             <div className={styles.dropdown}> 
             <label className={styles.word}><b>Year</b></label>
            <select name="text" id={styles.year} value = {year} onChange={(e) => setYear(e.target.value)}
            required>
              <option value={styles.Select}>Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>
              <option value="Graduate">Graduate</option>
            </select>
           </div> 
 
           <div className={styles.dropdown}> 
             <label className={styles.word}><b>Department</b></label>
            <select name="text" id={styles.department} value = {department} onChange={(e) => setDepartment(e.target.value)}
            required>
              <option value="Select">Select</option>
              <option value="Arts">Arts</option>
              <option value="Biological Sciences">Biological Sciences</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Engineering">Engineering</option>
              <option value="Humanities">Humanities</option>
              <option value="Information & Computer Sciences">Information & Computer Sciences</option>
              <option value="Interdisciplinary Studies">Interdisciplinary Studies</option>
              <option value="Law">Law</option>
              <option value="Physical Sciences">Physical Sciences</option>
              <option value="Social Ecology">Social Ecology</option>
              <option value="Social Sciences">Social Sciences</option>
            </select>
           </div> 

            <div className={styles.inputBox}> 
              <label className={styles.word}><b>Major</b></label>
             <input type="text" id="major" required></input>
            </div> 
       
             <div className={styles.change}> 
              <button type="submit">Change profile</button>
             </div> 
       
            </div> 
       </div> 
       </div>
    
  )
}

export default UserProfileChangeForm
