import actions from './actions'
import mutations from './mutations'

const weatherStore = {
  state: {
    tempLocation: {},
    currentWeather: {},
    multiDaysWeather: {},
    multiTimeWeather: {},
  },
  getters: {
    getReferenceCoordinate(state, _, rootState, rootGetters) {
      const { tempLocation } = state
      const userLocation = rootGetters.getStoredMyInfo?.coords
      return userLocation || tempLocation
    },
    getCurrentWeather(state) {
      return state.currentWeather
    },
    getMultiDaysWeather(state) {
      return state.multiDaysWeather
    },
    getMultiTimeWeather(state) {
      return state.multiTimeWeather
    },
  },
  mutations,
  actions,

}

export default weatherStore
