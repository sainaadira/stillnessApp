import React, { useState, useEffect } from 'react'
import './Breather.css'
import SoundButton from './Components/SoundButton/SoundButton'


const Breather = () => {
  //variable and function to set the breathe text to inhale/hold/exhale
  const [breatheText, setBreatheText] = useState('Inhale')
  // the total time the pointer goes around the circumfrence: 7 seconds
  const totalTime = 7500
  // the amount of time the circle expands on inhale: 2.8 seconds
  const breatheTime = (totalTime / 5) * 2
  // the amount of time to hold breath: 1.4 seconds
  const holdTime = totalTime / 5

  const breatheAnimation = () => {
    if (breatheText !== 'Inhale') {
      setBreatheText('Inhale')
    }
    setTimeout(() => {
      setBreatheText('Hold')
    }, holdTime)
    setTimeout(() => {
      setBreatheText('Exhale')
    }, breatheTime)
  }
  useEffect(() => {
    const animationTime = setInterval(breatheAnimation, totalTime)
    return () => {
      clearInterval(animationTime)
    }
  })

  return (
    <div className="backgroundImage">
      {/* navigation links: add behavior */}
      <nav >
        <ul className="navigation-links">
          <li>My Journal</li>
          <li>My Reflections </li>
          <li>Logout</li>
        </ul>
      </nav>

      {/* music plays on click event */}
      <div className="soundButton-container">

        <p className="soundButton-p">Choose some music to relax to</p>
        <SoundButton
          type='Ambient'
        />
        <SoundButton
          type='Nature'
        />
        <SoundButton
          type='Ocean'
        />
        <SoundButton
          type='Dreamy'
        />

      </div>

      <h1 className="breather-h1">Breather</h1>
      {/* if breatheText is inhale then the container will expand if its on exhale the container will shrink. */}
      <div className={`breather-container ${breatheText === "Inhale" ? "expand" : breatheText === 'Exhale' ? "shrink" : 'hold'}`}>
        {/* <!-- this div represents the solid colour circle --> */}
        <div className="circle"></div>

        {/* breatheText is changed dynamically here */}
        <p id="text">{breatheText}</p>

        {/* <!-- container to hold the little white pointer circle --> */}
        <div className="pointer-container">
          <div className="pointer"></div>
        </div>

        {/* <!-- gradient circle that helps indicate when to breathe/hold breath (border effect) --> */}
        <div className="gradient-circle"></div>

      </div>

      <div>
        <button className='logout-btn' onClick={() => window.location.href = "/Login"}>Logout</button>
      </div>

    </div>

  )
}


export default Breather;