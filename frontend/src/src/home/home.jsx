import styles from'./homeStyle.module.css'
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import {Link} from 'react-router-dom'

function home() {
  return (
    
  <body className={styles.homeBody}>

    <Header></Header>

    <div className={styles.welcomeText}>
        <div>Welcome</div>
        <div>to</div>
        <div>ZotPlan</div>
    </div>

    <div className={styles.centerContainer}>
            <div className={styles.signIn}> 
                <form action="./login">
                    <div className={styles.loginButton}> 
                        <button type={styles.submit}>Login</button>
                    </div>
                </form>  
                    
                    <a href="./register" className={styles.loginButton}>
                        <button id={styles.signup}>Signup</button>
                    </a>
            </div>  
           
    </div> 
    
    <Footer></Footer>

    

  </body>

  )
}

export default home
