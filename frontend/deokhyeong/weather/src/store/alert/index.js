import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const alert = {
  namespaced: true,
  state: {
    createdAt: '',
    status: '',
    message: '',
    timeout: 4000,
  },
  getters,
  mutations,
  actions,
}

export default alert
