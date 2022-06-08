import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const loading = {
  namespaced: true,
  state: {
    isLoading: false,
  },
  getters,
  mutations,
  actions,
}

export default loading
