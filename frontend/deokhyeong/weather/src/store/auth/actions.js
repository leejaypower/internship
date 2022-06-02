/* eslint-disable no-unused-vars */
import authApi from '@/service/api/auth'

const signIn = async ({ commit }, { email, password }) => {
  const response = await authApi.signIn({ email, password })
  if (response.status === 200) {
    commit('setAuthData', {
      level: response.data.level,
    })
  }
  return response
}

const signUp = async ({ commit }, { email, password }) => {
  const response = await authApi.signUp({ email, password })
  return response
}

const refreshSignIn = async ({ commit }) => {
  const response = await authApi.refreshSignIn()
  if (response.status === 200) {
    commit('setAuthData', {
      level: response.data.level,
    })
  }
  return response
}

export default {
  signIn,
  signUp,
  refreshSignIn,
}
