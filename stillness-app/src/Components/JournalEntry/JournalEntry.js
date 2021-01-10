import React, { useState } from 'react'
import './JournalEntry.css'

const JournalEntry = (props) => {

  const [entry, setEntry] = useState(props.journal)
  // variable and function the view mode of the textarea vs of unedited entry
  const [editMode, setEditMode] = useState(false)
  // variable and function to set the edits of the journal entry with the intial state of the original entry.
  const [editJournalEntry, setEditJournalEntry] = useState(entry)

  // function to save the journal entry and send to database
  const handleSaveEntry = () => {
    setEntry(editJournalEntry)
    // setting edit mode to false to change view back to orginal entry
    setEditMode(false)
    // using fetch call with a put method to save updated entry to database
    // currently not working but need to fix this
    fetch('/journal', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: props.id, journal: editJournalEntry })
    })
      // to do: handling loading the edit update
      .then(response => response.json())
      .then(data => console.log(data));
  }
  // function to grab the value of what user types into 'edit entry' textarea
  const handleEditJournalEntry = (e) => {
    // target is the textarea and value is the value user types into textarea
    setEditJournalEntry(e.target.value)
  }

  // function to delete journal entry 
  // currently not working and need to fix this
  const handleDeleteJournalEntry = () => {
    console.log(props.id)
    fetch('/journal', {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ _id: props.id })
    }).then(props.journals(entry => entry.filter(journal => journal._id !== props.id)))

    // .then()
    //   .catch(err => console.log(err))
  }

  // conditionally rendering the edit mode: toggle view
  // * if edit mode is true then display the textarea with the text to be edited
  // * and display the save updated entry button
  if (editMode === true) {
    return (
      <div className="journal-entry-edit">
        <h3> {props.mood}</h3>
        <textarea value={editJournalEntry} onChange={handleEditJournalEntry}>{editJournalEntry}</textarea>
        <button onClick={() => setEditMode(false)} className="edit-btn"> Cancel Edit</button>
        <button onClick={handleSaveEntry}>Save</button>
      </div>
    )
    // else return the orginal entry
  } else {
    let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    let timeOptions = { hour: '2-digit', minute: '2-digit' }
    let journalDate = new Date(props.createdAt).toLocaleDateString('us-en', dateOptions)
    let journalTime = new Date(props.createdAt).toLocaleTimeString('us-en', timeOptions)
    return (
      <div className="journal-entry">
        <h4> Today I feel:  {props.mood}</h4>
        <p>{entry}</p>
        <p>{journalDate} at {journalTime}</p>
        <button onClick={() => setEditMode(true)} className="edit-btn">Edit Entry</button>
        <button onClick={handleDeleteJournalEntry} className="delete-btn">Delete Entry</button>
      </div>
    )
  }
}



export default JournalEntry;