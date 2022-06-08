import http from '@/lib/http'
import './typedef'

/**
 * @param {openWeatherParamsType} params
 */
const getCurrentWeather = (params) => http.get('/weather', { params })

/**
 * @param {openWeatherAirPollutionParamsType} params
 */
const getAirPollution = (params) => http.get('/air_pollution', { params })

export default {
  getCurrentWeather,
  getAirPollution,
}
