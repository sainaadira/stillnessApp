import React, { useState } from 'react'
import './SoundButton.css'

// sound list: it supports four different audio sounds
const sounds = {
  Ambient: new Audio('https://freesound.org/data/previews/554/554220_9497060-lq.mp3'),
  Nature: new Audio('https://freesound.org/data/previews/524/524813_10859468-lq.mp3'),
  Ocean: new Audio(' https://freesound.org/data/previews/413/413326_7723777-lq.mp3'),
  Dreamy: new Audio('https://freesound.org/data/previews/263/263467_3946286-lq.mp3')
}

const SoundButton = (props) => {
  const [isPlaying, setIsPlaying] = useState(false)

  // function to handle the button's click and calls toggleSound() to play or pause audio depending on the state of isPlaying variable
  const handleClick = () => {
    return toggleSound()
  }

  // toggling the sound depending on the value of isPlaying and controlling the state
  const toggleSound = () => {
    if (isPlaying) {
      sounds[props.type].pause()
      setIsPlaying(false)
    } else {
      sounds[props.type].play()
      setIsPlaying(true)
    }
  }

  return (
    <button className={"sound-btn sound-btn-" + props.type} onClick={handleClick} type='button'>{props.type}</button>
  )
}


export default SoundButton