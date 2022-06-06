// 일단 분리만 해두고, 추후 error Store를 에러 처리 과정에서 어떻게 사용할지 고민
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
