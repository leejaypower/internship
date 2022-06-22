import { tryLogin, refreshLogin } from '@/sevices/auth/index'
import jwtDecode from 'jwt-decode'

export default {
  namespaced: true,
  state: {
    token: null,
  },
  getters: {
    token(state) {
      return state.token
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
  },
  actions: {
    async login({ commit, dispatch }, loginData) {
      try {
      /**
       * @type {object} 로그인 요청에 대한 응답 객체
       * @property {string} testAccessToken, testRefreshToken - 토큰이 없거나 만료된 경우 임의 토큰 반환
       * @property {string} accessToken - refreshtoken이 유효한 경우
       * @property {string} name, id - accesstoken이 유효한 경우
       */
        const response = await tryLogin(loginData)
        if (response.message === 'ISSUE_VALID_FAKE_TOKEN') {
          const { name, id } = response.data.testRefreshToken
          dispatch('userStore/setUserInfo', { name, id }, { root: true })
          localStorage.setItem('testAccessToken', JSON.stringify(response.data.testAccessToken))
          localStorage.setItem('testRefreshToken', JSON.stringify(response.data.testRefreshToken))
          commit('SET_TOKEN', response.data.testRefreshToken)
          return
        }

        if (response.message === 'ADMIN_LOGIN') {
          localStorage.setItem('access-token', response.data.accessToken)
          localStorage.setItem('refresh-token', response.data.refreshToken)
          const accessToken = jwtDecode(response.data.accessToken)
          const { name, id } = accessToken
          dispatch('userStore/setUserInfo', { name, id }, { root: true })
          commit('SET_TOKEN', jwtDecode(response.data.refreshToken))
          return
        }

        if (response.message === 'VALID_REFRESH_TOKEN') {
          localStorage.removeItem('access-token')
          localStorage.setItem('access-token', JSON.stringify(response.data.accessToken))
          const accessToken = jwtDecode(response.data.accessToken)
          const { name, id } = accessToken
          dispatch('userStore/setUserInfo', { name, id }, { root: true })
          return
        }

        if (response.message === 'VALID_FAKE_ACCESS_TOKEN') {
          dispatch('userStore/setUserInfo', response, { root: true })
        }
      } catch (error) {
        dispatch('alertStore/setAlertInfo', { type: 'error', message: error.message }, { root: true })
      }
    },
    async refresh({ commit, dispatch }) {
    // 새로고침으로 로그인을 재시도할 때
      try {
        /**
        * @type {object} 로그인 재요청에 대한 응답 객체
        * @property {object} name, id - accessToken이 유효한 경우
        * @property {object} testAccessToken - testRefreshToken이 유효한 경우 testAccessToken 재발급
        */
        const response = await refreshLogin()
        if (response.message === 'VALID_FAKE_REFRESH_TOKEN') {
          const { name, id } = response.data
          localStorage.setItem('testAccessToken', JSON.stringify(response.data))
          dispatch('userStore/setUserInfo', { name, id }, { root: true })
          commit('SET_TOKEN', localStorage.getItem('testRefreshToken'))
          return
        }
        if (response.message === 'VALID_FAKE_ACCESS_TOKEN') {
          dispatch('userStore/setUserInfo', response.data, { root: true })
          commit('SET_TOKEN', localStorage.getItem('testRefreshToken'))
          return
        }
        if (response.message === 'VALID_ACCESS_TOKEN') {
          dispatch('userStore/setUserInfo', response.data, { root: true })
          commit('SET_TOKEN', jwtDecode(localStorage.getItem('refresh-token')))
          return
        }

        if (response.message === 'VALID_REFRESH_TOKEN') {
          localStorage.setItem('access-token', response.data.accessToken)
          const decodedAccessToken = jwtDecode(response.data.accessToken)
          const { name, id } = decodedAccessToken
          dispatch('userStore/setUserInfo', { name, id }, { root: true })
          commit('SET_TOKEN', localStorage.getItem('refresh-token'))
        }
      } catch (error) {
        dispatch('alertStore/setAlertInfo', { type: 'error', message: error.message }, { root: true })
      }
    },
  },
}
