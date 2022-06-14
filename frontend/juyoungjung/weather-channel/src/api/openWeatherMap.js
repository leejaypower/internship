import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  headers: {
    'Content-Type': 'application/json',
  },
})

const API_KEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY

/**
 *
 * @see {@link fetchOneCallApi} openweathermap One Call API 문서
 * @see {@link https://openweathermap.org/api/one-call-api}
 */
const fetchOneCallApi = async ({ longitude, latitude }) => {
  const response = await api.get('/onecall', {
    params: {
      lon: longitude,
      lat: latitude,
      units: 'metric',
      appid: API_KEY,
    },
  })

  return response
}

const openWeatherApi = {
  fetchOneCallApi,
}

export default openWeatherApi
