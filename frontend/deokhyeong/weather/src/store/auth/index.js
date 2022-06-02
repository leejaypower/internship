import authActions from './actions'
import authMutations from './mutations'
import authGetters from './getters'

const auth = {
  namespaced: true,
  state: {
    level: null,
  },
  getters: {
    ...authGetters,
  },
  mutations: {
    ...authMutations,
  },
  actions: {
    ...authActions,
  },
}

export default auth
