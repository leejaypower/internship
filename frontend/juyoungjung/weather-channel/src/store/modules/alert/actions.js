import {
  SET_USER_API_RESPONSE,
  RESET_USER_API_RESPONSE,
  SET_WEATHER_API_RESPONSE,
  RESET_WEATHER_API_RESPONSE,
} from '@/constants'

const actions = {
  setUserApiResponse({ commit }, payload) {
    commit(SET_USER_API_RESPONSE, payload)
  },
  resetUserApiResponse({ commit }) {
    commit(RESET_USER_API_RESPONSE)
  },
  setWeatherApiResponse({ commit }, payload) {
    commit(SET_WEATHER_API_RESPONSE, payload)
  },
  resetWeatherApiResponse({ commit }) {
    commit(RESET_WEATHER_API_RESPONSE)
  },
}

export default actions
