import {
  SET_USER_API_RESPONSE,
  RESET_USER_API_RESPONSE,
  SET_WEATHER_API_RESPONSE,
  RESET_WEATHER_API_RESPONSE,
} from '@/constants'

const mutations = {
  [SET_USER_API_RESPONSE](state, payload) {
    const { text, type } = payload

    state.userApiResponse = {
      visible: true,
      text,
      type,
    }
  },
  [RESET_USER_API_RESPONSE](state) {
    state.userApiResponse = {
      visible: false,
      text: '',
      type: 'info',
    }
  },
  [SET_WEATHER_API_RESPONSE](state, payload) {
    state.weatherApiResponse = payload
  },
  [RESET_WEATHER_API_RESPONSE](state) {
    state.weatherApiResponse = {
      type: 'info',
      text: '',
      visible: false,
    }
  },
}

export default mutations
