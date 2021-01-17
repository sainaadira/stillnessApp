// function that handles the phrase to send to the user depending on the mood chosen
const getMoodPhrase = (mood) => {
  switch (mood) {
    case 'happy':
      // function for future optimization to generate more random phrases based on mood chosen
      // return getRandomHappyPhrase()
      return 'you can and will manifest anything you set intentions for.'
      break;
    case 'neutral':
      return 'you did it! a few moments of self-care can positively impact the rest of your day.'
      break;
    case 'sad':
      return 'you should not feel guilty for choosing yourself. There is so much gratitude to be had in giving yourself a moment of stillness.'
      break;
    case 'angry':
      return ' i hope you feel better after today\'s release.'
      break;
    case 'anxious':
      return 'you are such a beautiful being, I am so glad that you are here and investing in yourself.'
      break;

    default:
      return 'no mood detected'
      break;
  }
}

module.exports = getMoodPhrase

