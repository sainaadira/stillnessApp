import React, { useEffect, useState } from 'react'
import JournalEntry from '../JournalEntry/JournalEntry'
import './MoodJournalHistory.css'


const MoodJournalHistory = () => {

  const [journals, setJournals] = useState([])
  useEffect(() => {
    fetch('/userJournals')
      .then(res => res.json()).then(data => setJournals(data.result))
    // dependency array that checks for changes between the hook that is placed in the dependency array
  }, [journals])

  return (
    <div className="entry-container">
      <h1>Your Mindful Reflections</h1>
      {journals.map(entry => {
        // styling my journal entries here 
        // ultimately the goal is to return a journal entry component. 
        return (
          <div className="journal-entries">
            {/* passed over props to JournalEntry component  */}
            <JournalEntry
              key={entry.id}
              mood={entry.mood}
              entry={entry.journal}
            />
          </div>
        )
      })}
      {/* button will take user to Breather Component */}
      <button className="breather-btn" onClick={() => window.location.href = "/Breather"}>Begin Breathing Session</button>
    </div>

  )
}

export default MoodJournalHistory;