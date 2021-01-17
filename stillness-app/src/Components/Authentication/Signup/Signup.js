import React, { useState } from 'react'
import './Signup.css'

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
    <>
      <form method="POST" action='/signup'>
        {/* in order for react to read my inputs they must be in self closing tags */}
        <input onChange={handleContactChange} value={contactInfo.firstName} name="firstName" placeholder="First Name" />
        <input onChange={handleContactChange} value={contactInfo.lastName} name="lastName" placeholder="Last Name" />
        <input onChange={handleContactChange} value={contactInfo.email} name="email" placeholder="Email" />
        <input type="password" onChange={handleContactChange} value={contactInfo.password} name="password" placeholder="Password" />
        <input onChange={handleContactChange} value={contactInfo.phone} name="phone" placeholder="Phone Number" />
        <button>Sign me up</button>
      </form>
    </>
  )
}

export default Signup;