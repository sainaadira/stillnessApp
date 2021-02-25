import React, { useState } from 'react'
import './MoodJournal.css'
import MoodButton from './Components/MoodButton/MoodButton'
import Button from '@material-ui/core/Button';

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


  // 
  const handleMood = (mood) => {
    if (moodOption === mood) {
      setMoodOption('');
      setActiveMoodColor('')
    }
    else {
      setMoodOption(mood);
      const moodColor = moods.find(m => m.type === mood)
      setActiveMoodColor(moodColor.value);
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
    <div className="mood-journal-container">

      <div className="mood-journal-nav-btns">
        <Button variant="contained" color="default" onClick={() => window.location.href = "/MoodJournalHistory"}>View Journal</Button>

        <Button variant="contained" color="default" onClick={() => window.location.href = "/Login"}>Logout</Button>
      </div>
      <p>Thank you for being here on: {today}</p>
      <h1 className="moodJournal-h1">A personal space to self-reflect.</h1>




      {/* ________________________________________________
                          MOOD BUTTONS
        maps though moods array of and returns MoodButton component *
          ________________________________________________ */}
      <p>How are you feeling today?</p>

      <div className="mood-btn-container">
        {moods.map(mood => <MoodButton value={mood.value} setMood={handleMood} type={mood.type} active={activeMoodColor === mood.value} color={moodColor[mood.value]} key={mood.type} />)}

      </div>

      {/* _______________________________________________________
                        JOURNAL SPACE TEXT AREA
        _________________________________________________________ */}
      <div className="mood-journal-textarea">

        <form>
          <textarea value={journalSpace} name="journalEntry" onChange={handleJournalSpace} className="journal-space" rows="15" placeholder="Feel free to use this space to journal your thoughts." />
        </form>

      </div>


      <div className="journal-entry-btns">

        {/* submits journal entry */}
        <Button variant="contained" color="default" className="submit-btn" onClick={handleSubmit}>Submit</Button>

        {/* clears texarea */}
        <Button variant="contained" color="default" className="clear-btn" onClick={clearJournalEntry}>Clear</Button>
      </div>


    </div>
  )
}

export default MoodJournal;