import React from 'react'

const JournalEntry = (props) => {

  return (
    <div>
      <h3>{props.mood}</h3>
      <p>{props.entry}</p>
    </div>
  )
}

export default JournalEntry;