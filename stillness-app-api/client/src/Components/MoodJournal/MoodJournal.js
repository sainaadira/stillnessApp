import React, { useState } from 'react'
import './MoodJournal.css'
import MoodButton from './Components/MoodButton/MoodButton'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'



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

  // function to handle getting the mood and associated background color and clearing the background once the user clicks the button twice
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
    fetch('/api/saveJournalEntry', {
      method: "Post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(res => res.json()).then(data => { if (data.success) { window.location.href = '/app/moodJournalHistory' } })
  }

  return (
    <div className="mood-journal-container">
      <Container className="moodJournal-container" component="main" maxWidth="lg">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <nav>
            <ul className="mood-journal-ul">
              <li className="mood-journal-li"> <a className="mood-journal-link" href onClick={() => window.location.href = "/app/Breather"}>Breathe </a></li>
              <li className="mood-journal-li"> <a className="mood-journal-link" href onClick={() => window.location.href = "/app/MoodJournalHistory"}>View Reflections </a></li>
              <li className="mood-journal-li"> <a className="mood-journal-link" href onClick={() => window.location.href = "/app/Login"}>Logout </a></li>
            </ul>
          </nav>

          <img alt="stillness logo" className="landing-img" src="../../../assets/images/stillness-img.svg"></img>

          <div className="mood-title-paragraph">
            <h1 className="moodJournal-h1">Thank you for being here on: {today} .</h1>
            <p className="moodJournal-paragraph">A space for release: How are you feeling today?</p>
          </div>

          {/*                MOOD BUTTONS 
        maps though moods array of and returns MoodButton component */}
          <Grid item xs={12} sm={9} md={6}>
            <div className="mood-btn-container">
              {moods.map(mood => <MoodButton value={mood.value} setMood={handleMood} type={mood.type} active={activeMoodColor === mood.value} color={moodColor[mood.value]} key={mood.type} />)}
            </div>
          </Grid>

          {/* JOURNAL SPACE TEXT AREA */}
          <div className="mood-journal-textarea">
            <form className="mood-journal-form">
              <textarea className="journal-space" value={journalSpace} rows="12" cols="50" name="journalEntry" onChange={handleJournalSpace} placeholder="Feel free to further express yourself here." />
            </form>
          </div>



          <div className="moodJournal-btns-container">
            {/* clears texarea */}
            <Button variant="contained" color="default" className="clear-btn" onClick={clearJournalEntry}>Clear</Button>

            {/* submits journal entry */}
            <Button variant="contained" color="default" className="submit-btn" onClick={handleSubmit}>Submit</Button>
          </div>

        </Grid>
      </Container>
    </div >
  )
}

export default MoodJournal;