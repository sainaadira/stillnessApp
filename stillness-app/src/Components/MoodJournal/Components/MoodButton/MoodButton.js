import React from 'react'
import './MoodButton.css'
import Button from '@material-ui/core/Button';




// to capitalize the mood  name on button based on the type attribute
const capitalize = (t) => {
  return t.charAt(0).toUpperCase() + t.slice(1)
}

const MoodButton = (props) => {

  // destructuring properties as props to use in MoodButton
  const { value, type, active, color, setMood } = props

  // handleButtonClick passes the type of button the click created
  const handleButtonClick = () => {
    setMood(type);
  }

  return (

    <>
      <Button className="mood-btn" size='large' variant="contained" onClick={handleButtonClick} value={value} type={type} style={active ? { backgroundColor: color } : {}} >{capitalize(type)} </Button>

    </>
  )
}


export default MoodButton;