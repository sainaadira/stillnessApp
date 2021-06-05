import React, { useEffect, useState } from 'react'
import JournalEntry from '../JournalEntry/JournalEntry'
import './MoodJournalHistory.css'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const MoodJournalHistory = () => {

  const [journals, setJournals] = useState([])

  // all of the untouched original journal entries
  const [initialJournals, setInitialJournals] = useState([])

  useEffect(() => {
    fetch('/api/userJournals')
      .then(res => res.json()).then(data => { setJournals(data.result); setInitialJournals(data.result) })
    // dependency array that checks for changes between the hook that is placed in the dependency array
  }, [])

  // function to filter all journals by month
  const handleMonthFilter = (e) => {
    // currentTarget will bypass nested span
    /* conditional: if my current target equals the value of 'all' then display all journal entries otherwise display the filtered journals by month*/
    if (e.currentTarget.value === 'All') {
      setJournals(initialJournals)
    } else {
      let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
      let filteredJournals = initialJournals.filter(moodJournal => {
        let journalDate = new Date(moodJournal.createdAt).toLocaleDateString('us-en', dateOptions)
        // if the string includes the month then return true for the filter
        return journalDate.includes(e.currentTarget.value)
      })
      // will display journal entries based on the chosen month
      setJournals(filteredJournals)
    }
  }

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
            <li className="moodHistory-li"><a className="moodHistory-link" href onClick={() => window.location.href = "/app/MoodJournal"}>Back to Journal</a></li>
            <li className="moodHistory-li"><a className="moodHistory-link" href onClick={() => window.location.href = "/app/Breather"}>Begin Breathing</a></li>
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


        <Grid container>
          <div style={{ margin: '29px 0' }}>
            <Grid item justify="space-evenly" xs={12} sm={9} md={12}>

              <Button variant="contained" color="default" value="January" onClick={handleMonthFilter}>January</Button>
              <Button variant="contained" color="default" value="February" onClick={handleMonthFilter}>February</Button>
              <Button variant="contained" color="default" value="March" onClick={handleMonthFilter}>March</Button>
              <Button variant="contained" color="default" value="April" onClick={handleMonthFilter}>April</Button>
              <Button variant="contained" color="default" value="May" onClick={handleMonthFilter}>May</Button>
              <Button variant="contained" color="default" value="June" onClick={handleMonthFilter}>June</Button>
              <Button variant="contained" color="default" value="July" onClick={handleMonthFilter}>July</Button>
              <Button variant="contained" color="default" value="August" onClick={handleMonthFilter}>August</Button>
              <Button variant="contained" color="default" value="September" onClick={handleMonthFilter}>September</Button>
              <Button variant="contained" color="default" value="October" onClick={handleMonthFilter}>October</Button>
              <Button variant="contained" color="default" value="November" onClick={handleMonthFilter}>November</Button>
              <Button variant="contained" color="default" value="December" onClick={handleMonthFilter}>December</Button>
              <Button variant="contained" color="default" value="All" onClick={handleMonthFilter}>All</Button>
            </Grid>
          </div>
        </Grid>

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
                <Grid item xs={12} sm={9} md={6}>


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