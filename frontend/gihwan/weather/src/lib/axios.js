import axios from 'axios'

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/onecall'
const NAVER_URL = '/map-reversegeocode/v2/gc'

const weather = axios.create({
  baseURL: WEATHER_URL,
  method: 'GET',
  params: {
    appid: process.env.VUE_APP_WEATHER_API_KEY,
    lan: 'kr',
    units: 'metric',
    exclude: 'minutely',
  },
})

const naver = axios.create({
  baseURL: NAVER_URL,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-NCP-APIGW-API-KEY-ID': process.env.VUE_APP_NAVER_KEY_ID,
    'X-NCP-APIGW-API-KEY': process.env.VUE_APP_NAVER_KEY,
  },
  params: {
    output: 'json',
    orders: 'roadaddr',
  },
})

export { weather, naver }
