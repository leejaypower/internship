/* eslint-disable no-unused-vars */
import authApi from '@/service/api/auth'

const signIn = async ({ commit }, { email, password }) => {
  const response = await authApi.signIn({ email, password })
  if (response.status === 200) {
    commit('setAuthData', {
      email: response.data.email,
      password: response.data.password,
      token: response.data.token,
    })
  }
  return response
}

const signUp = async ({ commit }, { email, password }) => {
  const response = await authApi.signUp({ email, password })
  return response
}

export default {
  signIn,
  signUp,
}
