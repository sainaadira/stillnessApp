import React, { useState, useEffect } from 'react'
import './Breather.css'
import SoundButton from './Components/SoundButton/SoundButton'
// import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const Breather = () => {
  //variable that stores text before breathing session begins
  const initialBreatheText = 'Get Ready!'
  //variable and function to set the breathe text to inhale/hold/exhale
  const [breatheText, setBreatheText] = useState(initialBreatheText)
  // the total time the pointer goes around the circumfrence: 7 seconds
  const totalTime = 7500
  // the amount of time the circle expands on inhale: 2.8 seconds
  const breatheTime = (totalTime / 5) * 2
  // the amount of time to hold breath: 1.4 seconds
  const holdTime = totalTime / 5

  const breatheAnimation = () => {
    setBreatheText('Inhale')
    setTimeout(() => {
      setBreatheText('Hold')
      setTimeout(() => {
        setBreatheText('Exhale')
      }, holdTime)
    }, breatheTime)
    clearInterval(counterInterval)
  }

  // the useEffect that was not working:
  // it was being called multiple times which is why it was not behaving the way i wanted it to.
  // useEffect(() => {
  //   // equivalent to componentDidMount() and componentDidUpdate()
  //   const animationTime = setInterval(breatheAnimation, totalTime)
  //   // function that handles the umounting of the component and clears all resources
  //   return () => {
  //     // equivalent to componentWillUnmount()
  //     clearInterval(animationTime)
  //   }
  // })

  let counterInterval;
  // function that handles the countdown before breathing begins
  const initialBreatheCounter = () => {
    setTimeout(() => {
      let counter = 3
      counterInterval = setInterval(() => {
        setBreatheText(counter)
        counter--
      }, 1000)
    }, 3500)

  }
  // triggers function every time something happens (like an update)
  useEffect(() => {
    // componentDidMount() 
    initialBreatheCounter()
    const animationTime = setInterval(breatheAnimation, totalTime)
    // function that handles the umounting of the component and clears all resources
    return () => {
      // componentWillUnmount()
      clearInterval(animationTime)
    }
    // passing an empty array so that the useEffect is only run once. a way to define componentDidMount() so it runs only once
    // lets me have an empty array without warning.
    // eslint-disable-next-line 
  }, [])

  // function that gets the class according the state of the breatheText variable
  const getBreatherClass = () => {
    if (breatheText === 'Inhale') {
      return 'expand'
    } else if (breatheText === 'Exhale') {
      return 'shrink'
    } else if (breatheText === initialBreatheText) {
      return 'getready'
    } else {
      return 'hold'
    }
  }
  // stores getBreatherClass() function
  const breatherClass = getBreatherClass()

  return (
    <div className="breather-background-image">

      {/* navigation */}
      <nav className="breather-nav">
        <ul className="navigation-links">
          <li className="breather-nav-li"> <a href className="breather-nav-link" onClick={() => window.location.href = "/MoodJournal"}> My Journal</a></li>
          <li className="breather-nav-li">  <a href className="breather-nav-link" onClick={() => window.location.href = "/MoodJournalHistory"}>My Reflections</a> </li>
          <li className="breather-nav-li"> <a href className="breather-nav-link" onClick={() => window.location.href = "/Login"}> Logout</a></li>
        </ul>
      </nav>

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <h1 className="breather-h1">Breather</h1>

        <Grid item xs={12} sm={9} md={6}>
          {/* music plays on click event */}
          <p className="soundButton-p">Choose some music to relax to: </p>
          <div className="soundButton-container">

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
        </Grid>
        {/* </Grid> */}

        {/* div that contains breather-container class the logic from breatherClass function that dynamically changes the className depending on state of breatheText variable*/}
        <div className={`breather-container ${breatherClass}`}>
          {/* <!-- this div represents the solid color circle and the conditional logic: if breatheText variable is equal to 'Get Ready!' then display the initial-circle class, otherwise display the circle class--> */}
          <div className={`${breatheText === initialBreatheText ? "initial-circle" : "circle"}`}></div>

          {/* breatheText is changed dynamically here */}
          <p id="text">{breatheText}</p>

          {/* <!-- container to hold white pointer circle --> */}
          <div className="pointer-container">
            <div className="pointer"></div>
          </div>

          {/* <!-- gradient circle that helps indicate when to breathe/hold breath (gives the border effect) --> */}
          <div className="gradient-circle"></div>

        </div>
      </Grid>
    </div >
  )
}

export default Breather;