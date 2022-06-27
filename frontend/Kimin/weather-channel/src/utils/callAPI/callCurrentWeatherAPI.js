import axios from 'axios'
import { MY_WEATHER_API_KEY } from '@/constants'

const callCurrentWeatherAPI = async (lat, lon) => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,
      lon,
      appid: MY_WEATHER_API_KEY,
      units: 'metric',
    },
  })
  return response
}

export default callCurrentWeatherAPI
