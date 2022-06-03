import authActions from './actions'
import authMutations from './mutations'
import authGetters from './getters'

const auth = {
  namespaced: true,
  state: {
    userId: '',
    email: '',
    password: '',
    expire: '',
    refreshExpire: '',
    level: '',
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
