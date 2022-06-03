import errorActions from './actions'
import errorMutations from './mutations'
import errorGetters from './getters'

const error = {
  namespaced: true,
  state: {
    createdAt: '',
    status: '',
    message: '',
    timeout: 4000,
  },
  getters: {
    ...errorGetters,
  },
  mutations: {
    ...errorMutations,
  },
  actions: {
    ...errorActions,
  },
}

export default error
