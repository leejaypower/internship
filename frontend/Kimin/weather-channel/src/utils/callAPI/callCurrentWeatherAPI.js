import axios from 'axios'

const MY_API_KEY = process.env.VUE_APP_ALL_WEATHER_KEY_TWO

const callCurrentWeatherAPI = async (lat, lon) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${MY_API_KEY}&units=metric`)
  return response
}

export default callCurrentWeatherAPI
