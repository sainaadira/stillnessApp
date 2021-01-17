import React, { useState } from 'react'
import './MoodJournal.css'


const MoodJournal = () => {
  // gets the date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString('us-en', options)

  // creates the moodColor state and setMoodColor is the function that will render a new state when called.
  const [moodColor, setMoodColor] = useState({
    yellow: '',
    grey: '',
    blue: '',
    red: '',
    purple: ''
  })
  // moodOption has the mood stored in this variable and setMoodOption sets the mood whenever mood button gets clicked 
  const [moodOption, setMoodOption] = useState('')

  // storing journal entries inside of an empty string
  const [journalSpace, setJournalSpace] = useState('')

  // on click event: targeting the value of the button and calling setMoodColor to return a new object rendering a new background color.
  // call setMoodColor and return the object with empty string to clear bgColor
  // setMoodOption is a state change function call getMood function to grab the value of the mood the user clicks
  const handleMoodClick = (e) => {
    if (e.target.value === 'yellow') {
      if (moodColor.yellow === '') {
        setMoodOption(getMood(e.target.value))
        setMoodColor({
          yellow: 'yellow',
          grey: '',
          blue: '',
          red: '',
          purple: ''
        })
      } else {
        // clearing the color and the option
        setMoodOption('')
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: '',
          purple: ''
        })
      }
    }
    if (e.target.value === 'grey') {
      if (moodColor.grey === '') {
        setMoodOption(getMood(e.target.value))
        setMoodColor({
          yellow: '',
          grey: 'grey',
          blue: '',
          red: '',
          purple: ''
        })
      } else {
        setMoodOption('')
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: '',
          purple: ''
        })
      }
    }
    if (e.target.value === 'blue') {
      if (moodColor.blue === '') {
        setMoodOption(getMood(e.target.value))
        setMoodColor({
          yellow: '',
          grey: '',
          blue: 'blue',
          red: '',
          purple: ''
        })
      } else {
        setMoodOption('')
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: '',
          purple: ''
        })
      }
    }
    if (e.target.value === 'red') {
      setMoodOption(getMood(e.target.value))
      if (moodColor.red === '') {
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: 'red',
          purple: ''
        })
      } else {
        setMoodOption('')
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: '',
          purple: ''
        })
      }
    }
    if (e.target.value === 'purple') {
      setMoodOption(getMood(e.target.value))
      if (moodColor.purple === '') {
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: '',
          purple: 'purple'
        })
      } else {
        setMoodOption('')
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: '',
          purple: ''
        })
      }
    }
  }
  // function to grab value of what user enters in text area
  const handleJournalSpace = (e) => {
    const textAreaValue = e.target.value
    setJournalSpace(textAreaValue)
  }

  // fuction to clear what user typed in entry space
  const clearJournalEntry = () => {
    setMoodColor({
      yellow: '',
      grey: '',
      blue: '',
      red: '',
      purple: ''
    })
    // calling setJournalSpace to clear textarea
    setJournalSpace('')
  }
  // function that saves user's journal entry and direct them to their history page
  const handleSubmit = (e) => {
    const currentMood = moodOption
    const form = { journalEntry: journalSpace, mood: currentMood }
    fetch('/saveJournalEntry', {
      method: "Post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(res => res.json()).then(data => { if (data.success) { window.location.href = '/moodJournalHistory' } })

    e.preventDefault()
  }

  // 
  const getMood = (color) => {
    if (color === 'yellow') {
      return 'happy'
    } else if (color === 'grey') {
      return 'neutral'
    } else if (color === 'blue') {
      return 'sad'
    }
    else if (color === 'red') {
      return 'angry'
    } else if (color === 'purple') {
      return 'anxious'
    } else {
      return 'not a color'
    }
  }

  return (
    <div>
      <button className='view-journal-btn' onClick={() => window.location.href = "/MoodJournalHistory"}>View Your Journal</button>
      <button className='logout-btn' onClick={() => window.location.href = '/Login'}>Logout</button>

      <p>Thank you for being here on: {today}</p>
      <h1>A personal space to self-reflect.</h1>
      <p>How are you feeling?</p>
      <>
        {/* mood button options */}
        <button onClick={handleMoodClick} value='yellow' style={{ backgroundColor: moodColor.yellow }} name={moodColor.yellow}
          className="mood-btn yellow">Happy</button>
        <button onClick={handleMoodClick} value="grey" style={{ backgroundColor: moodColor.grey }} className="mood-btn grey">Neutral </button>
        <button onClick={handleMoodClick} value="blue" style={{ backgroundColor: moodColor.blue }} className="mood-btn blue">Sad</button>
        <button onClick={handleMoodClick} value="red" style={{ backgroundColor: moodColor.red }} className="mood-btn red">Angry</button>
        <button onClick={handleMoodClick} value="purple" style={{ backgroundColor: moodColor.purple }} className="mood-btn purple">Anxious</button>
      </>
      {/* journal space */}
      <>
        <form>
          <textarea value={journalSpace} name="journalEntry" onChange={handleJournalSpace} className="journal-space" rows="15" placeholder="Feel free to use this space to journal your thoughts." />
          <button onClick={handleSubmit} type="submit" className="submit btn">Submit</button>
          <button onClick={clearJournalEntry} className="clear btn">Clear</button>
        </form>
      </>
    </div>
  )
}

export default MoodJournal;