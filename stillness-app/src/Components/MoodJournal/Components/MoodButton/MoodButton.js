import React from 'react'


// to do: create single button component for each mood button using props that handles a click event and changes the background color when clicked.

// pass handleMoodClick function from Breather to MoodButton component
// handleMoodClick is in charge of changing background color depending on mood chosen
// this component will change state (background color) depending on mood chosen (isClicked, setIsClicked initial state will be false)
// target the style attribute on the button element 

const MoodButton = (props) => {
  // destructuring properties as props
  const { changeColor, value, type, active, color } = props


  return (
    <>
      <button onClick={changeColor} className="mood-btn" value={value} type={type} style={active ? { backgroundColor: color } : {}} >{type} </button>

    </>
  )


}


export default MoodButton;