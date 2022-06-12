import { fetchCurrentWeather, fetchWeeklyWeather } from '@/util/api/openweather'
import { getErrorMessage } from '@/util/api/errorHandling/index'

export default {
  namespaced: true,
  state: {
    currentTemp: '',
    currentWeatherResponse: {},
    dailyWeatherResponse: [],
  },
  getters: {
    temp(state) {
      return state.currentTemp
    },
    currentWeatherResponse(state) {
      return state.currentWeatherResponse
    },
    dailyWeatherResponse(state) {
      return state.dailyWeatherResponse
    },
  },
  mutations: {
    SET_CURRENT_TEMP(state, temp) {
      state.currentTemp = temp
    },
    SET_CURRENT_WEATHER(state, response) {
      state.currentWeatherResponse = response
    },
    SET_WEEKLY_WEATHER(state, response) {
      state.dailyWeatherResponse = response
    },
  },
  actions: {
    async fetchHereWeather({ commit, dispatch }, position) {
      dispatch('alertStore/setIsLoading', null, { root: true })
      try {
        const response = await fetchCurrentWeather(position.lat, position.lon)
        const { temp } = response.data.current
        commit('SET_CURRENT_WEATHER', response)
        commit('SET_CURRENT_TEMP', temp)
        dispatch('alertStore/removeIsLoading', null, { root: true })

        return response
      } catch (error) {
        const errorMessage = getErrorMessage()
        dispatch('alertStore/removeIsLoading', null, { root: true })
        dispatch('alertStore/setErrorInfo', errorMessage, { root: true })
      }
      return false
    },
    async fetchDailyWeather({ commit, dispatch }, position) {
      dispatch('alertStore/setIsLoading', null, { root: true })
      try {
        const response = await fetchWeeklyWeather(position.lat, position.lon)
        commit('SET_WEEKLY_WEATHER', response)
        dispatch('alertStore/removeIsLoading', null, { root: true })
        return response
      } catch {
        const errorMessage = getErrorMessage()
        dispatch('alertStore/removeIsLoading', null, { root: true })
        dispatch('alertStore/setErrorInfo', errorMessage, { root: true })
      }
      return false
    },
  },
}
