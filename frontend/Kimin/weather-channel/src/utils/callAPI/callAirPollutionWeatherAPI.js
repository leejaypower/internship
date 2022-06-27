import axios from 'axios'
import { MY_WEATHER_API_KEY } from '@/constants'

const callAirPollutionWeatherAPI = async (lat, lon) => {
  const response = await axios.get('http://api.openweathermap.org/data/2.5/air_pollution', {
    params: {
      lat,
      lon,
      appid: MY_WEATHER_API_KEY,
    },
  })
  return response
}

export default callAirPollutionWeatherAPI
