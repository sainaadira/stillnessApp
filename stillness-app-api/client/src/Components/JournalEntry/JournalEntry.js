import React, { useState } from 'react'
import './JournalEntry.css'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from '@material-ui/core/Container';



const JournalEntry = (props) => {

  const [entry, setEntry] = useState(props.journal)
  // variable and function the view mode of the textarea for edited vs. unedited entry
  const [editMode, setEditMode] = useState(false)
  // variable and function to set the edits of the journal entry with the intial state of the original entry.
  const [editJournalEntry, setEditJournalEntry] = useState(entry)

  // function to save the journal entry and send to database
  const handleSaveEntry = () => {
    setEntry(editJournalEntry)
    // setting edit mode to false to change view back to orginal entry
    setEditMode(false)
    // using fetch call with a put method to save updated entry to database
    fetch('/api/journal', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: props.id, journal: editJournalEntry })
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }
  // function to grab the value of what user types into 'edit entry' textarea
  const handleEditJournalEntry = (e) => {
    // target is the textarea and value is the value user types into textarea
    setEditJournalEntry(e.target.value)
  }

  // function to delete journal entry 
  const handleDeleteJournalEntry = () => {
    fetch('/api/journal', {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ _id: props.id })
      //using the journals array from MoodJournalHistory and filtering entries that haven't been deleted
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
        <p> Today I feel: {props.mood} </p>
        <textarea
          className="edit-textarea"
          value={editJournalEntry}
          onChange={handleEditJournalEntry} >{editJournalEntry}</textarea>

        <Container maxWidth="md">
          {/* save edit entry */}
          <Icon
            onClick={handleSaveEntry}>
            <SaveIcon style={{ fill: '#581845' }} fontSize="large" />
          </Icon>

          {/* cancel edit entry button */}
          <Icon
            onClick={() => setEditMode(false)}
            className="edit-btn">
            <CancelOutlinedIcon style={{ fill: '#581845' }} fontSize="large" />
          </Icon>
        </Container>
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

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} >
            <p className="journal-entry-date">{journalDate} at {journalTime}</p>
            <h4 className='feeling-title'> Today I feel: {props.mood}</h4>
            <p className="journal-entry-paragraph">{entry}</p>
          </Grid>

          {/* edit button */}
          <Grid item xs={12}>
            <Button
              onClick={() => setEditMode(true)}
              id="edit-btn"
              variant="contained"
              color="default"
              startIcon={<EditIcon />}
            > Edit
            </Button>
            {/* delete button */}
            <Button
              onClick={handleDeleteJournalEntry}
              id="delete-btn"
              variant="contained"
              color="default"
              startIcon={<DeleteIcon />}
            > Delete
          </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}



export default JournalEntry;