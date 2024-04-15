import React, {useRef, useState, useEffect} from 'react'
import { Form ,Card, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

const USER_REGEX = /^[A-Za-z\d]{2,20}$/
const PASS_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

export default function Signup() {
  
  const usernameRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const errRef = useRef()

  const[error,setError] = useState('')
  const[loading, setLoading] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if(passwordRef.current.value !== 
    passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    setError("")
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        name: usernameRef.current.value,
        password: passwordRef.current.value
      });
      // Assuming your backend returns the access token in the response
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      // Handle storing the access token, such as in local storage or state
      console.log('Access token:', accessToken)
      console.log('Refresh token:', refreshToken)
      // Reset form fields and loading state
      //usernameRef.current.value = '';
      //passwordRef.current.value = '';
      //passwordConfirmRef.current.value = '';
      setLoading(false);
    } catch (error) {
        if (error.response.status === 401) {
          setError('Invalid username or password')
        } 
        else {
          setError('An error occurred. Please try again later.')
        }
      setLoading(false);
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>

          {error && <Alert varaint="danger>">{error}</Alert>}

          <Form onSubmit={handleSubmit}>

            <Form.Group id = "username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="Username" ref={usernameRef} required />
            </Form.Group>

            <Form.Group id = "password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group id = "passwordConfirm" className="mb-4">
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control type="PasswordConfirm" ref={passwordConfirmRef} required />
            </Form.Group>

            <Button disabled = {loading} className = "w-100" type="submit">
              Sign Up
            </Button>

          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log In
      </div>


      
    </>
  )
}