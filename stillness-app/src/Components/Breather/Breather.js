import React, { useState, useEffect } from 'react'
import './Breather.css'



function Breather() {

  const [breatheText, setBreatheText] = useState('Inhale')
  const totalTime = 7500
  const breatheTime = (totalTime / 5) * 2
  const holdTime = totalTime / 5

  function breatheAnimation() {
    if (breatheText !== 'Inhale') {
      setBreatheText('Inhale')
    }
    setTimeout(() => {
      setBreatheText('Hold')
      setTimeout(() => {
        setBreatheText('Exhale')
      }, holdTime)
    }, breatheTime)
  }

  useEffect(() => {
    const animationTime = setInterval(breatheAnimation, totalTime)
    return () => {
      clearInterval(animationTime)
    }
  })

  return (
    <div>

      <h1>Breather</h1>
      <div className={`container ${breatheText === "Inhale" ? "expand" : breatheText === 'Exhale' ? "shrink" : ''}`}>
        {/* <!-- this div represents the solid colour circle --> */}
        <div className="circle"></div>

        {/* <!-- empty p because the text will be inserted dynamically via javascript --> */}
        <p id="text">{breatheText}</p>

        {/* <!-- container to hold the little white pointer circle --> */}
        <div className="pointer-container">
          <div className="pointer"></div>
        </div>

        {/* <!-- gradient circle that helps indicate whent to breathe/hold breath (border effect) --> */}
        <div className="gradient-circle"></div>

      </div>
    </div>

  )
}

export default Breather;
