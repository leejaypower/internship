/* eslint-disable no-shadow */
import { getCurrentWeatherData } from '@/api'
import { SET_CURRENT_WEATHER_DATA } from '@/constants/mutation-types'

const state = () => ({
  currentWeatherData: null,
  oneCallApiData: [],
})

const getters = {
  doneCurrentWeatherMain(state) {
    return state.currentWeatherData?.weather[0].main
  },
}

const actions = {
  async loadCurrentWeatherData({ commit }, payload) {
    commit(
      'SET_CURRENT_WEATHER_DATA',
      await getCurrentWeatherData(payload.cityName),
    )
  },
}

const mutations = {
  [SET_CURRENT_WEATHER_DATA](state, payload) {
    state.currentWeatherData = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
