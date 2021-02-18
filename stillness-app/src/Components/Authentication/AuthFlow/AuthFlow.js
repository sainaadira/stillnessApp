import React, { useState } from 'react'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import './AuthFlow.css'
import Button from '@material-ui/core/Button';

const AuthFlow = () => {
  // used to toggle between login and signup
  const [view, setView] = useState('login')

  const toggleView = (view) => {
    setView(view)
  }
  return (
    <div className="auth-background">

      <Button onClick={() => toggleView('login')} variant="outlined">Login</Button>
      <Button onClick={() => toggleView('signup')} variant="outlined">Signup</Button>
      {view === 'login' &&
        <Login />
      }
      {view === 'signup' &&
        <Signup />
      }
    </div>
  )
}

export default AuthFlow;