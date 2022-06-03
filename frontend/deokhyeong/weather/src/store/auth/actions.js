/* eslint-disable no-unused-vars */
import authApi from '@/service/api/auth'
import userMapping from '@/service/mapping/userMapping'
import authErrorMessageParser from '@/service/domain/auth/authErrorMessageParser'

const signIn = async ({ commit, dispatch }, { email, password }) => {
  try {
    const response = await authApi.signIn({ email, password })
    if (response.status === 200) {
      commit('setAuthData', userMapping(response.data))
    }
    return response
  } catch (error) {
    dispatch('error/recordError', {
      status: error.status,
      message: authErrorMessageParser(error.data.message, '로그인 실패'),
    }, { root: true })
    return error
  }
}

const getUserInfo = async ({ commit, dispatch }) => {
  try {
    const response = await authApi.getUserInfo()
    if (response.status === 200) {
      commit('setAuthData', userMapping(response.data))
    }
    return response
  } catch (error) {
    dispatch('error/recordError', {
      status: error.status,
      message: authErrorMessageParser(error.data.message),
    }, { root: true })
    return error
  }
}

const signUp = async ({ dispatch }, { email, password }) => {
  try {
    const response = await authApi.signUp({ email, password })
    return response
  } catch (error) {
    dispatch('error/recordError', {
      status: error.status,
      message: authErrorMessageParser(error.data.message, '회원가입 실패'),
    }, { root: true })
    return error
  }
}

const refreshSignIn = async ({ commit, dispatch }) => {
  try {
    const response = await authApi.refreshSignIn()
    if (response.status === 200) {
      commit('setAuthData', userMapping(response.data))
    }
    return response
  } catch (error) {
    dispatch('error/recordError', {
      status: error.status,
      message: authErrorMessageParser(error.data.message, '로그인 접속 기간 만료, 재로그인 필요'),
    }, { root: true })
    return error
  }
}

const repairUserInfo = async ({ commit, dispatch }, { repairUserData }) => {
  try {
    const response = await authApi.repairUserInfo(repairUserData)
    if (response.status === 200) {
      commit('setAuthData', userMapping(response.data))
    }
    return response
  } catch (error) {
    dispatch('error/recordError', {
      status: error.status,
      message: authErrorMessageParser(error.data.message, '정보 수정 실패'),
    }, { root: true })
    return error
  }
}

export default {
  signIn,
  signUp,
  refreshSignIn,
  repairUserInfo,
  getUserInfo,
}
