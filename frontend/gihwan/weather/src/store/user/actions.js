import { loginFetchByStorage } from '@/apis/auth'

export default {
  login({ commit }, payload) {
    const { id, pw, autoLogin } = payload
    const { isSuccess, failMessage, name } = loginFetchByStorage({ id, pw })
    if (isSuccess) {
      if (autoLogin) {
        localStorage.setItem('loginInfo', JSON.stringify({ id, name }))
      } else {
        sessionStorage.setItem('loginInfo', JSON.stringify({ id, name }))
      }
      commit('login', { id, name })
    } else {
      commit('loginFail', failMessage)
    }
  },
}
