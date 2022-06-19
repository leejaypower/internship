import { userApi } from '@/api'
import {
  SET_MY_INFO,
  REMOVE_MY_INFO,
  SET_LOGIN_FORM_MODAL_VISIBLE,
  SET_RESPONSE_INFO,
  RESET_RESPONSE_INFO,
  UPDATE_NICKNAME,
} from '@/constants'
import { translateResponseErrorCode } from '@/services'

const actions = {
  async login({ commit }, payload) {
    try {
      const response = await userApi.postLogin(payload)

      commit(SET_MY_INFO, response)
      commit(SET_RESPONSE_INFO, { type: 'success', message: '로그인에 성공하였습니다.' })
    } catch (error) {
      commit(SET_RESPONSE_INFO, { type: 'error', message: translateResponseErrorCode(error.data.code) })
    }
  },
  async signup({ commit }, payload) {
    try {
      await userApi.postSignup(payload)

      commit(SET_RESPONSE_INFO, { type: 'success', message: '회원가입이 정상적으로 완료되었습니다.' })
    } catch (error) {
      commit(SET_RESPONSE_INFO, { type: 'error', message: translateResponseErrorCode(error.data.code) })
    }
  },
  async updateNickname({ commit }, payload) {
    try {
      const response = await userApi.patchUpdateNickname(payload)

      commit(UPDATE_NICKNAME, response)
      commit(SET_RESPONSE_INFO, { type: 'success', message: '닉네임 수정에 성공하였습니다.' })
    } catch (error) {
      commit(SET_RESPONSE_INFO, { type: 'error', message: translateResponseErrorCode(error.data.code) })
    }
  },
  async updatePassword({ commit }, payload) {
    try {
      await userApi.patchUpdatePassword(payload)

      commit(SET_RESPONSE_INFO, { type: 'success', message: '비밀번호 수정에 성공하였습니다.' })
    } catch (error) {
      commit(SET_RESPONSE_INFO, { type: 'error', message: translateResponseErrorCode(error.data.code) })
    }
  },
  async renewalAccessTokenInfo({ commit }) {
    try {
      const response = await userApi.getCheckRefreshToken()

      commit(SET_MY_INFO, response)
    } catch (error) {
      commit(SET_RESPONSE_INFO, { type: 'info', message: translateResponseErrorCode(error.data.code) })
      commit(REMOVE_MY_INFO)
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

export default actions
