import alertActions from './actions'
import alertMutations from './mutations'
import alertGetters from './getters'

const alert = {
  namespaced: true,
  state: {
    createdAt: '',
    status: '',
    message: '',
    timeout: 4000,
  },
  getters: {
    ...alertGetters,
  },
  mutations: {
    ...alertMutations,
  },
  actions: {
    ...alertActions,
  },
}

export default alert
