import React from "react"
import Signup from "./Signup"
import {Container} from 'react-bootstrap'

export default function App() {
  return (
    <Container className= "d-flex align-items-center justify-content-center"
      sytle = {{minHeight: "100vh"}}
    >

      <div className="w-100" style = {{ maxWidth : "400px"}}>
        <Signup />
      </div>
      
    </Container>
    
  )
  
}