import axios from 'axios';
import MoodService from '../MoodService';
import moment from 'moment';

export default async function getData(userId) {
  const data = await getMoodDataForDataset(userId);

  const moods = data.moods;

  var moodRep = {
    1: '😫',
    2: '😔',
    3: '😐',
    4: '😃',
    5: '🥳'
  }
  
  return  {
    type: "line",
    data: {
      labels: data.dates,
      datasets: [
        {
          label: "Raspoloženje",
          data: data.moods,
          backgroundColor: "teal",
        },
      ]
    },
    options: {
      display: true,
      responsive: true,
      lineTension: 1,
      scales: {
        yAxes: [
          {
            ticks: {
              fontSize: 25,
              callback: function(value, index, values) {
                return moodRep[value];
              }
            }
          }
        ]
      }
    },
    payload: {
      timesEnteredMood: data.timesEnteredMood
    }
  };

  //returns moodchartData
}
// export const moodChartData =
  
// export default moodChartData;
  

async function getMoodDataForDataset(userId) {

  const moods = await MoodService.GetAllMoods(userId);

  var dates = [];
  var mood = [];

  moods.forEach((m) => {
    dates.push(moment(m.date).format("LL"));
    mood.push(m.mood)
  })

  return new Promise(resolve  => {
    resolve({
      dates: dates,
      moods: mood,
      timesEnteredMood: moods.length
    })
  })
}
