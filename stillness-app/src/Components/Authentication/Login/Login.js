import React, { useState } from 'react'
import "./Login.css"
import Button from '@material-ui/core/Button';

const Login = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prevState => {
      if (name === "email") {
        return {
          email: value,
          password: prevState.password
        }
      } else {
        return {
          email: prevState.email,
          password: value
        }
      }
    })
  }

  const handleSubmit = (e) => {
    console.log(form)
    e.preventDefault()
    fetch('/login', {
      method: "Post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(res => window.location.href = '/moodJournal')
  }
  return (

    <div>

      <form action='/login' method="POST" className="login-credentials">

        <label>Email</label>
        <input className="login-input" onChange={handleChange} value={form.email} placeholder="Email" name="email" />
        <label>Password</label>
        <input type="password" className="login-input" onChange={handleChange} value={form.password} placeholder="Password" name="password" />

        <Button className="login-btn" variant="contained" color="default" onClick={handleSubmit} type="submit">
          Login
        </Button>

      </form>
    </div>
  )
}

export default Login; 