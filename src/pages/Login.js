import React from 'react'
import LoginForm from '../components/Login/LoginForm'
import { getSavedInfo } from '../helpers/auth'
import { Navigate } from 'react-router-dom'
function Login() {
  if(getSavedInfo()
  )
  {
    return <Navigate to="/home"></Navigate>
  }
  return (
    <LoginForm />
  )
}

export default Login