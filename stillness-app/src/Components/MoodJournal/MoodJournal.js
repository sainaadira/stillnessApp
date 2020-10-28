import React, { useState } from 'react'
import './MoodJournal.css'


const MoodJournal = () => {
  // gets the date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString('us-en', options)


  return (
    <div>
      <span>Thank you for being here on: {today}</span>
      <h1>How are you feeling today?</h1>
      <>
        <button className="mood yellow">Happy</button>
        <button className="mood grey">Neutral</button>
        <button className="mood blue">Sad</button>
        <button className="mood red">Angry</button>
        <button className="mood green">Anxious</button>
      </>

      <>
        <textarea className="journal-space" rows="10" placeholder="Feel free to use this space to journal your thoughts." />
        <button className="submit btn">Submit</button>
        <button className="delete btn">Delete</button>


      </>
    </div>

  )
}

export default MoodJournal;