import axios from 'axios'
import { MY_WEATHER_API_KEY } from '@/constants'

const callFiveDaysWeather = async (lat, lon) => {
  // const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${MY_WEATHER_API_KEY}&units=metric`)
  const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      lat,
      lon,
      appid: MY_WEATHER_API_KEY,
      units: 'metric',
    },
  })

  return response
}

export default callFiveDaysWeather
