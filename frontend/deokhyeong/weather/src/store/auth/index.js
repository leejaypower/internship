import authActions from './actions'
import authMutations from './mutations'
import authGetters from './getters'

const auth = {
  namespaced: true,
  state: {
    email: '',
    password: '',
    token: '',
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
