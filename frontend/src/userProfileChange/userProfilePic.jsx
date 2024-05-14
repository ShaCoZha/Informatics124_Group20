import React, { useState } from 'react';
import styles from "./userProfilePicStyle.module.css"

function userProfilePic() {

  return (
    <div className={styles.pic}> 
      <h1><a href="#"><img src="/profile-pic.JPG" alt="Sample Image"></img></a></h1>
      <button type="submit">Change profile Picture</button>
    </div>

  )
}

export default userProfilePic
