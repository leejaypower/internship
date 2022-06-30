import {
  SET_CURRENT_LOCATION,
  SET_ONE_CALL_API_DATA,
  SET_CURRENT_COORDS,
  SET_SEARCH_COORDS,
  SET_FORECAST_HOURLY_DAY_TYPE,
  SET_FORECAST_HOURLY_INFO,
  SET_FORECAST_DAILY_INFO,
} from '@/constants'

const mutations = {
  [SET_CURRENT_COORDS](state, payload) {
    state.currentCoords = payload
  },
  [SET_SEARCH_COORDS](state, payload) {
    const { longitude, latitude } = payload

    state.currentCoords = { longitude, latitude }
  },
  [SET_ONE_CALL_API_DATA](state, payload) {
    state.oneCallApiCurrentData = payload.current
    state.oneCallApiHourlyData = payload.hourly
    state.oneCallApiDailyData = payload.daily
  },
  [SET_FORECAST_HOURLY_DAY_TYPE](state, payload) {
    state.forecastHourlyDayType = payload
  },
  [SET_FORECAST_HOURLY_INFO](state, payload) {
    state.forecastHourlyInfo = payload
  },
  [SET_FORECAST_DAILY_INFO](state, payload) {
    state.forecastDailyInfo = payload
  },
  [SET_CURRENT_LOCATION](state, payload) {
    state.currentLocation = payload
  },
}

export default mutations
