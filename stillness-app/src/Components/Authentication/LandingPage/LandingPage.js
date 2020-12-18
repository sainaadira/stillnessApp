import React from 'react'
import './LandingPage.css'


const LandingPage = () => {
  return (
    <div className='landing-container'>
      <h1 className="decription-title">Stillness is a powerful gift to yourself.</h1>
      <section className="description-container">
        <p className="description-paragraph">The Stillness app allows you to track your mood and journal your thoughts each day. If you need a moment for meditative breathing after a cathartic release, take as much time as you need. This time is for you. Give yourself the gift of investing into yourself. </p>
      </section>
      {/* button will take user to Login/Signup Page */}
      {/* window is the api and location.href will link to to another page (url) */}
      <button onClick={() => window.location.href = "/Login"}>I'm ready!</button>
    </div>
  )
}


export default LandingPage;