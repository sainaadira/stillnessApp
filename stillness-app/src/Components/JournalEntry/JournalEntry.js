import React, { useState } from 'react'
import './JournalEntry.css'

const JournalEntry = (props) => {

  const [entry, setEntry] = useState(props.entry)
  // variable and function the view mode of the textarea vs og unedited paragraph
  const [editMode, setEditMode] = useState(false)
  // variable and function to set the edits of the journal entry with the intial state of the original entry.
  const [editJournalEntry, setEditJournalEntry] = useState(entry)

  // function to save the journal entry and send to database
  const handleSaveEntry = () => {
    setEntry(editJournalEntry)
    // setting edit mode to false to change view back to paragraph
    setEditMode(false)
    // using fetch to save entry to database
    // currently not working but need to fix this
    fetch('/journal', { method: 'PUT', body: { journal: { _id: props.id, journal: 'hello' } } })
      .then(response => response.json())
      .then(data => console.log(data));
  }

  const handleEditJournalEntry = (e) => {
    // target is the textarea and value is the value user types into textarea
    setEditJournalEntry(e.target.value)
  }

  // conditionally rendering the edit mode: toggle view
  // * if edit mode is true then display the textarea with the text to be edited
  // * and display the save edit button
  if (editMode === true) {
    return (
      <>
        <h3>{props.mood}</h3>
        <textarea value={editJournalEntry} onChange={handleEditJournalEntry}>{editJournalEntry}</textarea>
        <button onClick={() => setEditMode(false)} className="edit-btn"> Cancel Edit</button>
        <button onClick={handleSaveEntry}>Save</button>
        <button className="delete-btn">Delete Entry</button>
      </>
    )
    // else return the entry and moods
  } else {
    return (
      <>
        <h3>{props.mood}</h3>
        <p>{entry}</p>
        <button onClick={() => setEditMode(true)} className="edit-btn">Edit Entry</button>
        <button className="delete-btn">Delete Entry</button>
      </>
    )
  }
}

export default JournalEntry;