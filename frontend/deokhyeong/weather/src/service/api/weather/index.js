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

/**
 * 원 콜 API는 현재, 분별, 시간별, 일주일별 날씨 정보를 한 번에 받아올 수 있는 API입니다.
 * 그러나 이번 프로젝트에서 최대한 많은 API를 효과적으로 다루는 연습을 하고자하여
 * 각각 독립적인 API가 존재한다고 가정하고 코드를 작성하겠습니다.
 * @param {openWeatherParamsType} _params
 */
const getOneWeekWeathers = (_params) => http.get('/onecall', { params: { ..._params, exclude: 'current,minutely,hourly' } })

/**
 * 원 콜 API는 현재, 분별, 시간별, 일주일별 날씨 정보를 한 번에 받아올 수 있는 API입니다.
 * 그러나 이번 프로젝트에서 최대한 많은 API를 효과적으로 다루는 연습을 하고자하여
 * 각각 독립적인 API가 존재한다고 가정하고 코드를 작성하겠습니다.
 * @param {openWeatherParamsType} _params
 */
const getHourlyWeathers = (_params) => http.get('/onecall', { params: { ..._params, exclude: 'current,minutely,daily' } })

export default {
  getCurrentWeather,
  getAirPollution,
  getOneWeekWeathers,
  getHourlyWeathers,
}
