import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import styles from './userProfileFormStyle.module.css';
const axiosApiInstance = axios.create();
import { setupAxiosInterceptors } from '../verifyToken.jsx';
setupAxiosInterceptors(axiosApiInstance);


function UserProfileForm() {
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile()
  }, []);


  async function fetchUserProfile() {
    try
    {
      const response = await axiosApiInstance.get('http://localhost:3000/user/getUserProfile', {
        withCredentials: true
      }
      );
      console.log("call")
      setName(response.data.displayName);
      setyear(response.data.year);
      setDepartment(response.data.department);
      setMajor(response.data.major);
    }
    catch(error)
    {
      navigate('/login');
    }
  
  }

    const [name, setName] = useState('')
    const [year, setyear] = useState('')
    const [department, setDepartment] = useState('')
    const [major, setMajor] = useState('')

  return (

    <div className={styles.centerContainer}>

            <h2><label className={styles.word}>Profile</label></h2> 

            <div className={styles.form}> 
       
             <div className={styles.displayField}> 
               <label className={styles.word}><b>DisplayName</b></label>
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
              <a href="../userProfileChange" className={styles.buttonLink}>
                <button type="submit">Change profile</button>
              </a>
             </div> 
       
            </div> 

    </div>

  )
}

export default UserProfileForm
