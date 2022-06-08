// 일단 분리만 해두고, 추후 error Store를 에러 처리 과정에서 어떻게 사용할지 고민
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const error = {
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

export default error
