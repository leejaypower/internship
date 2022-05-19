import authActions from './actions'
import authMutations from './mutations'
import authGetters from './getters'

const authStore = {
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

export default authStore
