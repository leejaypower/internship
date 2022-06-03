import { loginFetch } from '@/apis/auth'
import { changeUserNameFetch } from '@/apis/user'

export default {
  async login({ commit }, payload) {
    const { id, pw, autoLogin } = payload
    try {
      const { userInfo, tokens } = await loginFetch({ id, pw })
      commit('login', userInfo)
      if (autoLogin) {
        localStorage.setItem('accessToken', tokens.accessToken)
        localStorage.setItem('refreshToken', tokens.refreshToken)
        localStorage.setItem('loginInfo', JSON.stringify(userInfo))
      } else {
        sessionStorage.setItem('accessToken', tokens.accessToken)
        sessionStorage.setItem('refreshToken', tokens.refreshToken)
        sessionStorage.setItem('loginInfo', JSON.stringify(userInfo))
      }
    } catch (error) {
      commit('loginFail', error.message)
    }
  },
  autoLogin({ commit }, payload) {
    commit('login', payload)
  },
  async changeUserName({ commit }, payload) {
    try {
      await changeUserNameFetch(payload)
      const localLoginInfo = JSON.parse(localStorage.getItem('loginInfo'))
      const sessionLoginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))
      if (localLoginInfo) {
        localStorage.setItem('loginInfo', JSON.stringify({ ...localLoginInfo, name: payload.newName }))
      } else {
        sessionStorage.setItem('loginInfo', JSON.stringify({ ...sessionLoginInfo, name: payload.newName }))
      }
      commit('changeUserNameSuccess', payload.newName)
    } catch (error) {
      commit('changeUserNameFail', error.message)
    }
  },
  logout({ commit }) {
    commit('logout')
    localStorage.removeItem('loginInfo')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    sessionStorage.removeItem('loginInfo')
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshToken')
  },
}
