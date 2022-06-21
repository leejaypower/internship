import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const weather = {
  namespaced: true,
  state: {
    currentWeather: {},
    currentAirPollution: {},
    oneWeekWeathers: [],
    hourlyWeathers: [],
  },
  getters,
  mutations,
  actions,
}

export default weather
