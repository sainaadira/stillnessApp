import React from 'react'
import { Pie } from 'react-chartjs-2'


const MoodChart = () => {


  const data = {
    // happy, neutral, sad, angry, anxious
    labels: ['Happy', 'Neutral', 'Sad', 'Angry', 'Anxious'],
    datasets: [
      {
        label: 'Mood Tracker',
        // fetch data from database to populate data from each selected moods?
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          '#E2B31C', // yellow
          '#626563', // grey
          '#385F8A', // blue
          '#AB1C27', // red
          '#603775' // purple
        ],
        borderColor: [
          '#E2B31C',
          '#626563',
          '#626563',
          '#626563',
          '#603775'
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="mood-pie-chart">
      <Pie
        data={data}
        width={100}
        height={50}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  )
}

export default MoodChart;