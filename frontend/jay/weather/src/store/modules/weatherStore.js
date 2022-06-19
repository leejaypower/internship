import { fetchCurrentWeather, fetchWeeklyWeather, fetchRegionalWeather } from '@/util/api/openweather'
import { getErrorMessage } from '@/util/api/errorHandling/index'

export default {
  namespaced: true,
  state: {
    currentTemp: '',
    currentWeatherResponse: {},
    dailyWeatherResponse: [],
    regionalcurrentWeather: {},
    regionalweeklyWeather: [],

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
    regionalcurrentWeather(state) {
      return state.regionalcurrentWeather
    },
    regionalweeklyWeather(state) {
      return state.regionalweeklyWeather
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
    SET_REGIONAL_CURRENT_WEATHER(state, currentWeather) {
      state.regionalcurrentWeather = currentWeather
    },
    SET_REGIONAL_WEEKLY_WEATHER(state, weeklyWeather) {
      state.regionalweeklyWeather = weeklyWeather
    },
  },
  actions: {
    async fetchHereWeather({ commit, dispatch }, position) {
      dispatch('alertStore/setIsLoading', null, { root: true })
      try {
        const response = await fetchCurrentWeather(position.lat, position.lon)
        const { temp } = response.data.current
        commit('SET_CURRENT_WEATHER', response.data)
        commit('SET_CURRENT_TEMP', temp)
        dispatch('alertStore/removeIsLoading', null, { root: true })
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        dispatch('alertStore/removeIsLoading', null, { root: true })
        dispatch('alertStore/setErrorInfo', errorMessage, { root: true })
      }
    },
    async fetchDailyWeather({ commit, dispatch }, position) {
      dispatch('alertStore/setIsLoading', null, { root: true })
      try {
        const response = await fetchWeeklyWeather(position.lat, position.lon)
        commit('SET_WEEKLY_WEATHER', response.data.daily)
        dispatch('alertStore/removeIsLoading', null, { root: true })
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        dispatch('alertStore/removeIsLoading', null, { root: true })
        dispatch('alertStore/setErrorInfo', errorMessage, { root: true })
      }
    },
    async fetchDistrictWeather({ commit, dispatch }, position) {
      try {
        dispatch('alertStore/setIsLoading', null, { root: true })

        const response = await fetchRegionalWeather(position.lat, position.lon)
        const regionalcurrentWeather = response.data.current
        const regionalweeklyWeather = response.data.daily
        commit('SET_REGIONAL_CURRENT_WEATHER', regionalcurrentWeather)
        commit('SET_REGIONAL_WEEKLY_WEATHER', regionalweeklyWeather)
        dispatch('alertStore/removeIsLoading', null, { root: true })
      } catch (error) {
        dispatch('alertStore/removeIsLoading', null, { root: true })
        const errorMessage = getErrorMessage(error)
        dispatch('alertStore/setErrorInfo', errorMessage, { root: true })
      }
    },
  },
}
