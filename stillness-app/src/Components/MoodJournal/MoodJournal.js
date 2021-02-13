import React, { useState } from 'react'
import './MoodJournal.css'
import MoodButton from './Components/MoodButton/MoodButton'


const lowercase = (l) => {
  return l.toLowerCase()
}

const MoodJournal = () => {
  // gets the date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString('us-en', options)

  // all hex colors for the mood stored inside object
  const moodColor = {
    yellow: '#E2B31C',
    grey: '#626563',
    blue: '#385F8A',
    red: '#AB1C27',
    purple: '#603775'
  }

  // all moods with type(mood) and value(color) stored inside array of objects
  const moods = [{
    type: 'happy',
    value: 'yellow'
  },
  {
    type: 'neutral',
    value: 'grey'
  },
  {
    type: 'sad',
    value: 'blue'
  },
  {
    type: 'angry',
    value: 'red'
  },
  {
    type: 'anxious',
    value: 'purple'
  }
  ]

  // moodOption has the mood stored in this variable and setMoodOption sets the mood whenever mood button gets clicked 
  const [moodOption, setMoodOption] = useState('')

  // activeMoodColor stores the color that user clicks and setActiveMoodColor sets the state change of that button  depending on which mood is clicked
  const [activeMoodColor, setActiveMoodColor] = useState('')

  // storing journal entries inside of an empty string
  const [journalSpace, setJournalSpace] = useState('')

  // function that handles the button click for each mood button and calls setMoodOption and setActiveMoodColor to grab the innerText and value of selected button

  const handleMoodClick = (e) => {
    e.preventDefault()
    // functions that are responsible for targeting the value and innerText of button clicked.
    setMoodOption(lowercase(e.target.innerText))
    setActiveMoodColor(e.target.value)

    // if activeMoodColor is equal to value and moodOption to innertext (checking if the value and text are the same) then call setMoodOption and setActiveMoodColor and clear the background color once clicked again.
    if (activeMoodColor === e.target.value && moodOption === e.target.innerText) {
      setMoodOption('')
      setActiveMoodColor('')
    }
  }
  // function to grab value of what user enters in text area
  const handleJournalSpace = (e) => {
    const textAreaValue = e.target.value
    setJournalSpace(textAreaValue)
  }

  // fuction to clear what user typed in entry space
  const clearJournalEntry = () => {
    // calling setJournalSpace to clear textarea
    setJournalSpace('')
  }
  // function that saves user's journal entry and direct them to their reflections page
  const handleSubmit = (e) => {
    e.preventDefault()
    const currentMood = moodOption
    const form = { journalEntry: journalSpace, mood: currentMood }
    fetch('/saveJournalEntry', {
      method: "Post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(res => res.json()).then(data => { if (data.success) { window.location.href = '/moodJournalHistory' } })
  }

  return (
    <div>
      <button className='view-journal-btn' onClick={() => window.location.href = "/MoodJournalHistory"}>View Your Journal</button>
      <button className='logout-btn' onClick={() => window.location.href = '/Login'}>Logout</button>

      <p>Thank you for being here on: {today}</p>
      <h1 className="moodJournal-h1">A personal space to self-reflect.</h1>
      <p>How are you feeling?</p>

      <div className="mood-btn-container">

        {/* ________________________________________________
                          MOOD BUTTONS
        maps though moods array of and returns MoodButton component *
          ________________________________________________ */}

        {moods.map(mood => <MoodButton changeColor={handleMoodClick} value={mood.value} type={mood.type} active={activeMoodColor === mood.value} color={moodColor[mood.value]} key={mood.type} />)}

      </div>

      {/* journal space textarea */}
      <>
        <form>
          <textarea value={journalSpace} name="journalEntry" onChange={handleJournalSpace} className="journal-space" rows="15" placeholder="Feel free to use this space to journal your thoughts." />

        </form>
        <button onClick={handleSubmit} type="submit" className="submit btn">Submit</button>
        <button onClick={clearJournalEntry} className="clear btn">Clear</button>
      </>
    </div>
  )
}

export default MoodJournal;