// function that handles the phrase to send to the user depending on the mood chosen
const getMoodPhrase = (mood) => {
  switch (mood) {
    case 'happy':
      // function for future optimization to generate more random phrases based on mood chosen
      // return getRandomHappyPhrase()
      return 'you can and will manifest anything you set intentions for.'
      break;
    case 'neutral':
      return 'you are so worthy of this time to yourself and a few moments of self-care can positively impact the rest of your day.'
      break;
    case 'sad':
      return 'we thank you for choosing yourself today. There is so much gratitude to be had in giving yourself a moment of stillness.'
      break;
    case 'angry':
      return 'today was a beautiful day for a cathartic release. We\'re happy you took the time to give back to yourself.'
      break;
    case 'anxious':
      return 'you are such a beautiful being. We are so glad that you are here and investing in yourself.'
      break;

    default:
      return 'no mood detected'
      break;
  }
}

module.exports = getMoodPhrase

