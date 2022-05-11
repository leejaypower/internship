import axios from 'axios'

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY

const getCurrentWeatherData = (cityName) => {
  const response = axios.get(`/weather?q=${cityName}&appid=${API_KEY}`)
  response.then((res) => {
    console.log('response', res)
  })
}

const getOneCallApiData = (pos, exclude) => {
  const response = axios.get(`/onecall?lat=${pos.lat}&lon=${pos.lon}&exclude=${exclude.join(',')}&units=metric&appid=${API_KEY}`)
  response.then((res) => {
    // https://openweathermap.org/api/one-call-api
    console.log('response', res)
  })
}

export { getCurrentWeatherData, getOneCallApiData }
