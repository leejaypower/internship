import { userApi } from '@/api'
import {
  SET_MY_INFO,
  REMOVE_MY_INFO,
  SET_LOGIN_FORM_MODAL_VISIBLE,
  UPDATE_NICKNAME,
} from '@/constants'
import { makeApiResponseInfo } from '@/services'
import { fakeAxiosErrorHandler, translateFakeAxiosResponseErrorCode } from '@/services/errorHandler'

const actions = {
  async login({ commit, dispatch }, payload) {
    try {
      const response = await userApi.postLogin(payload)

      commit(SET_MY_INFO, response)

      const info = makeApiResponseInfo(
        'success',
        '로그인에 성공하였습니다.',
      )

      dispatch('alert/setUserApiResponse', info, { root: true })
    } catch (error) {
      fakeAxiosErrorHandler(error)

      const info = makeApiResponseInfo(
        'error',
        translateFakeAxiosResponseErrorCode(error.data?.code),
      )

      dispatch('alert/setUserApiResponse', info, { root: true })
    }
  },
  async signup({ dispatch }, payload) {
    try {
      await userApi.postSignup(payload)

      const info = makeApiResponseInfo(
        'success',
        '회원가입이 정상적으로 완료되었습니다.',
      )

      dispatch('alert/setUserApiResponse', info, { root: true })
    } catch (error) {
      fakeAxiosErrorHandler(error)

      const info = makeApiResponseInfo(
        'error',
        translateFakeAxiosResponseErrorCode(error.data?.code),
      )

      dispatch('alert/setUserApiResponse', info, { root: true })
    }
  },
  async updateNickname({ commit, dispatch, getters }, payload) {
    try {
      const response = await userApi.patchUpdateNickname(payload)

      commit(UPDATE_NICKNAME, response)

      const info = makeApiResponseInfo(
        'success',
        '닉네임 수정에 성공하였습니다.',
      )

      dispatch('alert/setUserApiResponse', info, { root: true })
    } catch (error) {
      let userInfo = null

      if (getters.myInfo) {
        const { email, nickname } = getters.myInfo

        userInfo = {
          email,
          nickname,
        }
      }

      fakeAxiosErrorHandler(error, userInfo)

      const info = makeApiResponseInfo(
        'error',
        translateFakeAxiosResponseErrorCode(error.data?.code),
      )

      dispatch('alert/setUserApiResponse', info, { root: true })
    }
  },
  async updatePassword({ dispatch, getters }, payload) {
    try {
      await userApi.patchUpdatePassword(payload)

      const info = makeApiResponseInfo(
        'success',
        '비밀번호 수정에 성공하였습니다.',
      )

      dispatch('alert/setUserApiResponse', info, { root: true })
    } catch (error) {
      let userInfo = null

      if (getters.myInfo) {
        const { email, nickname } = getters.myInfo

        userInfo = {
          email,
          nickname,
        }
      }

      fakeAxiosErrorHandler(error, userInfo)

      const info = makeApiResponseInfo(
        'error',
        translateFakeAxiosResponseErrorCode(error.data?.code),
      )

      dispatch('alert/setUserApiResponse', info, { root: true })
    }
  },
  async renewalAccessTokenInfo({ commit, dispatch, getters }) {
    try {
      const response = await userApi.getCheckRefreshToken()

      commit(SET_MY_INFO, response)
    } catch (error) {
      let userInfo = null

      if (getters.myInfo) {
        const { email, nickname } = getters.myInfo

        userInfo = {
          email,
          nickname,
        }
      }

      fakeAxiosErrorHandler(error, userInfo)

      dispatch('alert/setUserApiResponse', { type: 'info', text: translateFakeAxiosResponseErrorCode(error.data.code) }, { root: true })
      commit(REMOVE_MY_INFO)
    }
  },
  setLoginFormModalVisible({ commit }, payload) {
    commit(SET_LOGIN_FORM_MODAL_VISIBLE, payload)
  },
  logout({ commit, dispatch }) {
    commit(REMOVE_MY_INFO)
    dispatch('alert/resetUserApiResponse', null, { root: true })
  },
}

export default actions
