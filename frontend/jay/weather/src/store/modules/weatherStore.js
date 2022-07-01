import { fetchCurrentWeather, fetchWeeklyWeather, fetchRegionalWeather } from '@/util/api/openweather'

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
    temperature(state) {
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
        const { data: responseData } = await fetchCurrentWeather(position.lat, position.lon)
        const temp = responseData.current?.temp
        const temparature = temp !== undefined ? temp : '-'
        commit('SET_CURRENT_WEATHER', responseData)
        commit('SET_CURRENT_TEMP', temparature)
        dispatch('alertStore/removeIsLoading', null, { root: true })
      } catch (error) {
        dispatch('errorStore/handlePredictableError', { error, errorCode: error.response.status }, { root: true })
        dispatch('alertStore/removeIsLoading', null, { root: true })
      }
    },

    async fetchDailyWeather({ commit, dispatch }, position) {
      dispatch('alertStore/setIsLoading', null, { root: true })
      try {
        const { data: responseData } = await fetchWeeklyWeather(position.lat, position.lon)
        commit('SET_WEEKLY_WEATHER', responseData)
        dispatch('alertStore/removeIsLoading', null, { root: true })
      } catch (error) {
        dispatch('errorStore/handlePredictableError', { error, errorCode: error.response.status }, { root: true })
        dispatch('alertStore/removeIsLoading', null, { root: true })
      }
    },

    async fetchCurrentAndDailyWeather({ commit, dispatch }, position) {
      dispatch('alertStore/setIsLoading', null, { root: true })
      const results = await Promise.allSettled([
        fetchCurrentWeather(position.lat, position.lon),
        fetchWeeklyWeather(position.lat, position.lon),
      ])

      results.forEach((item) => {
        if (item.status === 'rejected') {
          dispatch('errorStore/handlePredictableError', { error: item.value, errorCode: item.value.status }, { root: true })
          dispatch('alertStore/removeIsLoading', null, { root: true })
          return
        }
        if (item.value.data.current) {
          commit('SET_CURRENT_WEATHER', item.value.data)
        }
        if (item.value.data.daily) {
          commit('SET_WEEKLY_WEATHER', item.value.data)
        }
        dispatch('alertStore/removeIsLoading', null, { root: true })
      })
    },

    async fetchDistrictWeather({ commit, dispatch }, position) {
      try {
        dispatch('alertStore/setIsLoading', null, { root: true })

        const { data: responseData } = await fetchRegionalWeather(position.lat, position.lon)
        const regionalcurrentWeather = responseData.current
        const regionalweeklyWeather = responseData.daily
        commit('SET_REGIONAL_CURRENT_WEATHER', regionalcurrentWeather)
        commit('SET_REGIONAL_WEEKLY_WEATHER', regionalweeklyWeather)
        dispatch('alertStore/removeIsLoading', null, { root: true })
      } catch (error) {
        dispatch('errorStore/handlePredictableError', { error, errorCode: error.response.status }, { root: true })
        dispatch('alertStore/removeIsLoading', null, { root: true })
      }
    },
  },
}
