import React, { useEffect, useState } from 'react'
import JournalEntry from '../JournalEntry/JournalEntry'
import './MoodJournalHistory.css'


const MoodJournalHistory = () => {

  const [journals, setJournals] = useState([])
  useEffect(() => {
    fetch('/userJournals')
      .then(res => res.json()).then(data => { setJournals(data.result) })
    // dependency array that checks for changes between the hook that is placed in the dependency array
  }, [])

  return (

    <div>

      <section className="breather-btn-container">
        {/* button will take user to MoodJournal component */}
        <button className="breather-btn" onClick={() => window.location.href = "/MoodJournal"}>Back to Journal</button>

        {/* button will take user to Breather Component */}
        <button className="breather-btn" onClick={() => window.location.href = "/Breather"}>Begin Breathing Session</button>

      </section>

      <div className="entry-container">

        <h1 className='reflection-title'>Your Reflections</h1>
        {journals.map(entry => {
          // styling my journal entries here 
          return (
            <JournalEntry
              key={entry._id}
              id={entry._id}
              // manually moving data from database
              journals={setJournals}
              // passing everything over from the entry variable
              {...entry}
            />
          )
        })}
      </div>



    </div>
  )
}

export default MoodJournalHistory;