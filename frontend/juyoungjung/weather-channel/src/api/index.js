import axios from 'axios'

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY

const getCurrentWeatherData = async (cityName) => {
  // https://openweathermap.org/current
  try {
    const response = await axios.get('/weather', {
      params: {
        q: cityName,
        appid: API_KEY,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}

const getOneCallApiData = async (pos, exclude) => {
  // https://openweathermap.org/api/one-call-api
  try {
    const response = await axios.get('/onecall', {
      params: {
        lat: pos.lat,
        lon: pos.lon,
        exclude: exclude.join(','),
        units: 'metric',
        appid: API_KEY,
      },
    })
    return response
  } catch (error) {
    console.error(error)
    return false
  }
}

export { getCurrentWeatherData, getOneCallApiData }
