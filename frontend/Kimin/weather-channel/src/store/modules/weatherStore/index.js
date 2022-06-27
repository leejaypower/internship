import { deepClone } from '@/utils'
import actions from './actions'
import mutations from './mutations'

const weatherStore = {
  state: {
    tempLocation: {},
    currentWeather: {},
    multiDaysWeather: {},
    multiTimeWeather: {},
    citiesWeatherInfo: [],
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
    getCitiesWeatherInfo(state) {
      const weathers = deepClone(state.citiesWeatherInfo)
      for (let i = 0; i < weathers.length; i += 1) {
        weathers[i].index = i
        weathers[i].no = i + 1
      }
      return weathers
    },
  },
  mutations,
  actions,

}

export default weatherStore
