import React, { useEffect, useState } from 'react'
import JournalEntry from '../JournalEntry/JournalEntry'
import './MoodJournalHistory.css'
// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const MoodJournalHistory = () => {

  const [journals, setJournals] = useState([])
  useEffect(() => {
    fetch('/userJournals')
      .then(res => res.json()).then(data => { setJournals(data.result) })
    // dependency array that checks for changes between the hook that is placed in the dependency array
  }, [])

  return (
    <div className="mood-history-container">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <nav className="moodHistory-nav-container">
          <ul className="moodHistory-ul">
            <li className="moodHistory-li"><a className="moodHistory-link" href onClick={() => window.location.href = "/MoodJournal"}>Back to Journal</a></li>
            <li className="moodHistory-li"><a className="moodHistory-link" href onClick={() => window.location.href = "/Breather"}>Begin Breathing</a></li>
          </ul>
        </nav>
      </Grid>

      {/* ___________________________________________________________________
 
                                JOURNAL ENTRIES 
        all entries are mapped through and returns JournalEntry component
      ____________________________________________________________________ */}

      <div className="entry-container">
        <h1 className='reflection-title'>Your Reflections</h1>
        <img alt="stillness logo" className="landing-img" src="../../../assets/images/stillness-img.svg"></img>

        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            {journals.map(entry => {
              // styling my journal entries here 
              return (
                <Grid item xs={12} md={6}>
                  <JournalEntry
                    key={entry._id}
                    id={entry._id}
                    // manually moving data from database
                    journals={setJournals}
                    // passing everything over from the entry variable
                    {...entry}
                  />
                </Grid>
              )
            })}

          </Grid>
        </Container>
      </div>
    </div >
  )
}

export default MoodJournalHistory;