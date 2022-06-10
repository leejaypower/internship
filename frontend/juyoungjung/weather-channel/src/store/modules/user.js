/* eslint-disable no-shadow */
import { userApi } from '@/api'
import {
  SET_MY_INFO, REMOVE_MY_INFO, SET_LOGIN_FORM_MODAL_VISIBLE,
  SET_RESPONSE_INFO, RESET_RESPONSE_INFO, UPDATE_NICKNAME,
} from '@/constants/mutation-types'
import { REFRESHTOKEN, REFRESHTOKENEXPIRETIME } from '@/constants/localStorage-types'
import translateResponseErrorCode from '@/services/translateResponseErrorCode'

const state = () => ({
  myInfo: null,
  isLoginFormModalVisible: false,
  responseInfo: {
    type: 'info',
    message: '',
    visible: false,
  },
})

const getters = {
  isLoginFormModalVisible(state) {
    return state.isLoginFormModalVisible
  },
  myInfo(state) {
    return state.myInfo
  },
  nickname(state) {
    return state.myInfo?.nickname
  },
  accessToken(state) {
    return state.myInfo?.accessToken
  },
  responseInfo(state) {
    return state.responseInfo
  },
  responseInfoType(state) {
    return state.responseInfo.type
  },
  responseInfoMessage(state) {
    return state.responseInfo.message
  },
}

const actions = {
  async login({ commit }, payload) {
    const response = await userApi.postLogin(payload)

    if (response.data?.code) {
      commit(SET_RESPONSE_INFO, response)
    } else {
      commit(SET_MY_INFO, response)
      commit(SET_RESPONSE_INFO, { status: response.status, message: '로그인에 성공하였습니다.' })
    }
  },
  async signup({ commit }, payload) {
    const response = await userApi.postSignup(payload)
    if (response.data?.code) {
      commit(SET_RESPONSE_INFO, response)
    } else {
      commit(SET_RESPONSE_INFO, { status: response.status, message: '회원가입이 정상적으로 완료되었습니다.' })
    }
  },
  async updateNickname({ commit }, payload) {
    const response = await userApi.patchUpdateNickname(payload)

    if (response.data?.code) {
      commit(SET_RESPONSE_INFO, response)
    } else {
      commit(UPDATE_NICKNAME, response)
      commit(SET_RESPONSE_INFO, { status: response.status, message: '닉네임 수정에 성공하였습니다.' })
    }
  },
  async updatePassword({ commit }, payload) {
    const response = await userApi.patchUpdatePassword(payload)
    if (response.data?.code) {
      commit(SET_RESPONSE_INFO, response)
    } else {
      commit(SET_RESPONSE_INFO, { status: response.status, message: '비밀번호 수정에 성공하였습니다.' })
    }
  },
  async renewalAccessTokenInfo({ commit }) {
    const response = await userApi.getCheckRefreshToken()
    if (response.data?.code) {
      commit(SET_RESPONSE_INFO, response)
      commit(REMOVE_MY_INFO)
    } else {
      commit(SET_MY_INFO, response)
    }
  },
  setLoginFormModalVisible({ commit }, payload) {
    commit(SET_LOGIN_FORM_MODAL_VISIBLE, payload)
  },
  setResponseInfo({ commit }, payload) {
    commit(SET_RESPONSE_INFO, payload)
  },
  resetResponseInfo({ commit }) {
    commit(RESET_RESPONSE_INFO)
  },
  logout({ commit }) {
    commit(REMOVE_MY_INFO)
    commit(RESET_RESPONSE_INFO)
  },
}

const mutations = {
  [SET_MY_INFO](state, payload) {
    const {
      email, nickname, accessToken, accessTokenExpireTime, refreshToken, refreshTokenExpireTime,
    } = payload.data

    if (refreshToken) {
      localStorage.setItem(REFRESHTOKEN, refreshToken)
      localStorage.setItem(REFRESHTOKENEXPIRETIME, refreshTokenExpireTime)
    }

    state.myInfo = {
      email,
      nickname,
      accessToken,
      accessTokenExpireTime,
    }
  },
  [REMOVE_MY_INFO](state) {
    state.myInfo = null
    localStorage.removeItem(REFRESHTOKEN)
    localStorage.removeItem(REFRESHTOKENEXPIRETIME)
  },
  [SET_LOGIN_FORM_MODAL_VISIBLE](state, payload) {
    state.isLoginFormModalVisible = payload.visible
  },
  [SET_RESPONSE_INFO](state, payload) {
    if (payload.data?.code) {
      state.responseInfo.message = translateResponseErrorCode(payload.data.code)
    } else {
      state.responseInfo.message = payload.message
    }

    state.responseInfo.type = payload.status === 200 ? 'success' : 'error'
    state.responseInfo.visible = true
  },
  [RESET_RESPONSE_INFO](state) {
    state.responseInfo.message = ''
    state.responseInfo.type = 'info'
    state.responseInfo.visible = false
  },
  [UPDATE_NICKNAME](state, payload) {
    state.myInfo.nickname = payload.data.nickname
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
