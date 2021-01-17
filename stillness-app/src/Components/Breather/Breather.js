import React, { useState, useEffect } from 'react'
import './Breather.css'

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
    }, totalTime)
  }
  useEffect(() => {
    const animationTime = setInterval(breatheAnimation, totalTime)
    return () => {
      clearInterval(animationTime)
    }
  })

  //AUDIO BUTTON OPTIONS
  let ambient = new Audio('https://freesound.org/data/previews/554/554220_9497060-lq.mp3')
  let nature = new Audio('https://freesound.org/data/previews/524/524813_10859468-lq.mp3')
  let ocean = new Audio(' https://freesound.org/data/previews/413/413326_7723777-lq.mp3')
  let dreamy = new Audio('https://freesound.org/data/previews/263/263467_3946286-lq.mp3')

  // creating a function for every button.this way works for now but i'd like to later refactor the code so one function handles each button click. need to work on pausing audio for each button
  const ambientSound = () => {
    return ambient.play()
  }
  const natureSound = () => {
    return nature.play()
  }

  const oceanSound = () => {
    return ocean.play()
  }

  const dreamySound = () => {
    return dreamy.play()
  }

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
      <p>Choose some music to relax to</p>
      <button onClick={ambientSound}>Ambient</button>
      <button onClick={natureSound}>Nature + Birds</button>
      <button onClick={oceanSound}>Ocean Waves</button>
      <button onClick={dreamySound}>Dreamy</button>

      <h1>Breather</h1>
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
        <button onClick={() => window.location.href = "/Login"}>Logout</button>
      </div>

    </div>

  )
}

export default Breather;