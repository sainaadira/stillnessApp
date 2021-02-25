import React, { useState } from 'react'
import './Signup.css'
import Button from '@material-ui/core/Button';

const Signup = () => {
  // contactInfo variable to store the user's credentials and setContactInfo is the function that will handle the state change for the inputs.
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  })
  // handleContactChange is responsible for accessing the value that the user types into the inputs
  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactInfo(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  return (
    <div className="signup-container">
      <form className="signup-credentials" method="POST" action='/signup'>
        {/* in order for react to read my inputs they must be in self closing tags */}
        <label>First Name</label>
        <input className="signup-input" onChange={handleContactChange} value={contactInfo.firstName} name="firstName" placeholder="First Name" />

        <label>Last Name</label>
        <input className="signup-input" onChange={handleContactChange} value={contactInfo.lastName} name="lastName" placeholder="Last Name" />

        <label>Email</label>
        <input className="signup-input" onChange={handleContactChange} value={contactInfo.email} name="email" placeholder="Email" />

        <label>Password</label>
        <input className="signup-input" type="password" onChange={handleContactChange} value={contactInfo.password} name="password" placeholder="Password" />

        <label>Phone Number</label>
        <input className="signup-input" onChange={handleContactChange} value={contactInfo.phone} name="phone" placeholder="Phone Number" />

        <Button variant="contained" color="default" onClick={() => window.location.href = "/MoodJournal"}>
          Sign me up
        </Button>
      </form>
    </div>
  )
}

export default Signup;