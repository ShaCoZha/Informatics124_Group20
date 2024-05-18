import React, { useState } from 'react';
import styles from './feedbackFormStyle.module.css';


function feedbackForm() {

  return (
    <div className={styles.centerContainer}>
        <h2><label className={styles.word}>Feedback</label></h2> 
       
       <div className={styles.form}> 
  
            <div className={styles.inputBox}> 
            <label className={styles.word}><b>Name</b></label>
            <input type="text" id="name" required></input>
            </div> 
    
            <div className={styles.dropdown}> 
            <label className={styles.word}><b>What's your feedback about</b></label>
            <select name="text" id="type" required>
                <option value="Select">Select</option>
                <option value="Suggestion">Suggestion</option>
                <option value="BugReport">Bug Report</option>
                <option value="Other">Others</option>
            </select>
            </div> 

            <div className={styles.inputArea}> 
            <label className={styles.word}><b>Tell us what can be improved</b></label>
            <textarea id="feedbackBox" rows="4" required></textarea>
            </div> 
    
            <div className={styles.submitButton}> 
            <button type="submit">Submit</button>
            </div> 
        </div>
    </div>
  )
}

export default feedbackForm
