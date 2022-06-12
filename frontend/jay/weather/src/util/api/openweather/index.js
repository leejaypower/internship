import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    units: 'metric',
    appid: process.env.VUE_APP_WEATHER_API_KEY,
  },
})

async function fetchCurrentWeather(lat, lon) {
  const response = await instance.get('/onecall', {
    params: {
      lon,
      lat,
      exclude: 'minutely,daily,alerts',
    },
  })
  return response
}

async function fetchWeeklyWeather(lat, lon) {
  const response = await instance.get('/onecall', {
    params: {
      lon,
      lat,
      exclude: 'current,minutely,hourly,alerts',
    },
  })
  return response
}

export { fetchCurrentWeather, fetchWeeklyWeather }
