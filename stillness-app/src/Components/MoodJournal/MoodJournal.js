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
    green: ''
  })
  // storing journal entries inside of an empty array 
  const [journalSpace, setJournalSpace] = useState([])

  // on click event: targeting the value of the button and calling setMoodColor to return a new object rendering a new background color.
  // call setMoodColor and return the object with empty string to clear bgColor
  const handleMoodClick = (e) => {

    if (e.target.value === 'yellow') {
      if (moodColor.yellow == '') {
        setMoodColor({
          yellow: 'yellow',
          grey: '',
          blue: '',
          red: '',
          green: ''
        })
      } else {
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: '',
          green: ''
        })
      }
    }
    if (e.target.value === 'grey') {
      if (moodColor.grey == '') {
        setMoodColor({
          yellow: '',
          grey: 'grey',
          blue: '',
          red: '',
          green: ''
        })
      } else {
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: '',
          green: ''
        })
      }
    }
    if (e.target.value === 'blue') {
      if (moodColor.blue == '') {
        setMoodColor({
          yellow: '',
          grey: '',
          blue: 'blue',
          red: '',
          green: ''
        })
      } else {
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: '',
          green: ''
        })
      }
    }
    if (e.target.value === 'red') {
      if (moodColor.red == '') {
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: 'red',
          green: ''
        })
      } else {
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: '',
          green: ''

        })
      }
    }
    if (e.target.value === 'green') {
      if (moodColor.green == '') {
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: '',
          green: 'green'
        })
      } else {
        setMoodColor({
          yellow: '',
          grey: '',
          blue: '',
          red: '',
          green: ''
        })
      }
    }
  }

  const handleJournalSpace = (e) => {
    const textAreaValue = e.target.value
    console.log(textAreaValue);
  }

  const submitJournalEntry = () => {
    console.log('i will submit');
  }

  const clearJournalEntry = () => {
    console.log('i will clear');
  }

  return (
    <div>
      <p>Thank you for being here on: {today}</p>
      <h1>A personal space to self-reflect.</h1>
      <p>How are you feeling?</p>
      <>
        <button onClick={handleMoodClick} value='yellow' style={{ backgroundColor: moodColor.yellow }} name={moodColor.yellow} className="mood-btn yellow">Happy</button>
        <button onClick={handleMoodClick} value="grey" style={{ backgroundColor: moodColor.grey }} className="mood-btn grey">Neutral </button>
        <button onClick={handleMoodClick} value="blue" style={{ backgroundColor: moodColor.blue }} className="mood-btn blue">Sad</button>
        <button onClick={handleMoodClick} value="red" style={{ backgroundColor: moodColor.red }} className="mood-btn red">Angry</button>
        <button onClick={handleMoodClick} value="green" style={{ backgroundColor: moodColor.green }} className="mood-btn green">Anxious</button>
      </>

      <>
        <textarea onChange={handleJournalSpace} className="journal-space" rows="15" placeholder="Feel free to use this space to journal your thoughts." />
        <button onClick={submitJournalEntry} className="submit btn">Submit</button>
        <button onClick={clearJournalEntry} className="clear btn">Clear</button>
      </>
    </div>

  )
}

export default MoodJournal;