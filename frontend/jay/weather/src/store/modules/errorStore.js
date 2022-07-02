import { createErrorDesc } from '@/sevices/error'
import { ERROR_LEVEL } from '@/lib/constants'
import collectLog from '@/plugins/errorHandler'
import { sendFailedRequest } from '@/sevices/auth'

export default {
  namespaced: true,

  state: {
    error: {
      show: false,
      info: [],
    },
  },
  getters: {
    error(state) {
      return state.error
    },
  },
  mutations: {
    ADD_ERROR(state, errorInfo) {
      state.error.show = true
      state.error.info.push(errorInfo)
    },
    CLEAR_ERROR(state) {
      state.error.show = false
      state.error.info = []
    },
  },
  actions: {
    handleUnpredictableError({ commit, dispatch }, errorInfo) {
      if (!errorInfo) {
        dispatch('alertStore/setAlertInfo', { type: 'error', message: '알 수 없는 에러가 발생하여 처리할 수 없습니다.' }, { root: true })
        return
      }

      if (errorInfo.level < ERROR_LEVEL.FATAL) {
        dispatch('alertStore/setAlertInfo', { type: 'error', message: errorInfo.message }, { root: true })
        return
      }
      commit('ADD_ERROR', errorInfo)
      collectLog(errorInfo)
    },

    handlePredictableError({ commit, dispatch }, errorInfo) {
      if (!errorInfo) {
        dispatch('alertStore/setAlertInfo', { type: 'error', message: '알 수 없는 에러가 발생하여 처리할 수 없습니다.' }, { root: true })
        return
      }

      const errorDesc = createErrorDesc(errorInfo)
      if (errorDesc.level < ERROR_LEVEL.FATAL) {
        dispatch('alertStore/setAlertInfo', { type: 'error', message: errorDesc.message }, { root: true })
        return
      }
      dispatch('alertStore/setAlertInfo', { type: 'error', message: '예상치 못한 에러가 발생했습니다.' }, { root: true })
      commit('ADD_ERROR', errorDesc)
      collectLog(errorDesc)
    },

    clearError({ commit }) {
      commit('CLEAR_ERROR')
    },

    async causeRuntimeError({ dispatch }) {
      try {
        await sendFailedRequest()
      } catch (error) {
        dispatch('handlePredictableError', { error, errorCode: error.errorCode })
      }
    },

    async causeApiError({ dispatch }) {
      try {
        const error = new Error('서버 에러 테스트')
        Object.assign(error, { errorCode: 500 })
        throw error
      } catch (error) {
        dispatch('errorStore/handlePredictableError', { error, errorCode: 500 }, { root: true })
      }
    },
  },
}
