import React, { useEffect, useState } from 'react'
import './MoodJournalHistory.css'

const MoodJournalHistory = () => {

  const [journals, setJournals] = useState([])
  useEffect(() => {
    fetch('/userJournals')
      .then(res => res.json()).then(data => setJournals(data.result))
    // dependency array that checks for changes between the hook that is placed in the dependency array
  }, [journals])

  return (
    <div>
      {journals.map(journal => {
        // styling my journal entries here 
        return (
          <div>{journal.mood + '  ' + journal.journal} </div>
        )
      })}
      {/* button will take user to Breather Component */}
      <button onClick={() => window.location.href = "/Breather"}>Meditative Breathing</button>
    </div>
  )
}

export default MoodJournalHistory;