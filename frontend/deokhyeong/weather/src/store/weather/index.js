import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const weather = {
  namespaced: true,
  state: {
    currentWeather: {},
    currentAirPollution: {},
  },
  getters,
  mutations,
  actions,
}

export default weather
