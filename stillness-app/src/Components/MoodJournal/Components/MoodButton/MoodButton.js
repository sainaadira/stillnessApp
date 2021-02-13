import React from 'react'


// to capitalize the mood based on the type property
const capitalize = (t) => {
  return t.charAt(0).toUpperCase() + t.slice(1)
}

const MoodButton = (props) => {
  // destructuring properties as props
  const { changeColor, value, type, active, color } = props

  return (
    <>
      <button onClick={changeColor} className="mood-btn" value={value} type={type} style={active ? { backgroundColor: color } : {}} >{capitalize(type)} </button>

    </>
  )
}


export default MoodButton;