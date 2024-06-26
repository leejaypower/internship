import axios from 'axios'
import { naverErrorMap, openWeatherErrorMap } from '@/services/mapping'

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/onecall'
const NAVER_URL = '/map-reversegeocode/v2/gc'

const weatherAxios = axios.create({
  baseURL: WEATHER_URL,
  method: 'GET',
  params: {
    appid: process.env.VUE_APP_WEATHER_API_KEY,
    lang: 'kr',
    units: 'metric',
    exclude: 'minutely',
  },
})

weatherAxios.interceptors.response.use((response) => response, (error) => {
  const newError = {
    ...error,
    errorMessage: openWeatherErrorMap(error.message),
  }
  return Promise.reject(newError)
})

const naverAxios = axios.create({
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

naverAxios.interceptors.response.use((response) => response, (error) => {
  const newError = {
    ...error,
    errorMessage: naverErrorMap(error.response.data.error.message),
  }
  return Promise.reject(newError)
})

export { weatherAxios, naverAxios }
