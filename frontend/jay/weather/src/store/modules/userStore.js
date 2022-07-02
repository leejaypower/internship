import {
  checkUserId, tryRegister, matchPassword, modifyPassword,
} from '@/sevices/user'

export default {
  namespaced: true,
  state: {
    user: {
      id: '',
      name: '',
    },
  },
  getters: {
    userInfo(state) {
      return state.user
    },
    isLogin(state) {
      return state.user.id !== ''
    },
  },
  mutations: {
    SET_ID(state, userid) {
      state.user.id = userid
    },
    SET_USER(state, userInfo) {
      state.user.name = userInfo.name
      state.user.id = userInfo.id
    },
    CLEAR_USER(state) {
      state.user.id = ''
      state.user.name = ''
    },
  },
  actions: {
    setUserId({ commit }, userid) {
      commit('SET_ID', userid)
    },
    setUserInfo({ commit }, userInfo) {
      commit('SET_USER', userInfo)
    },
    clearUserInfo({ commit }) {
      commit('CLEAR_USER')
    },
    async checkUserId({ dispatch }, userId) {
      try {
        const response = await checkUserId(userId)

        if (response === userId) {
          const error = new Error('서버 응답에 문제가 발생하여 중복검사를 처리할 수 없습니다.')
          const errorObj = { error, errorCode: 500 }
          throw errorObj
        }

        dispatch('alertStore/setAlertInfo', {
          type: 'success',
          message: '사용 가능한 아이디입니다.',
        }, { root: true })

        return response
      } catch (error) {
        dispatch('errorStore/handlePredictableError', error, { root: true })
        return 'failed'
      }
    },
    async registerUser({ dispatch }, newUser) {
      try {
        const response = await tryRegister(newUser)

        if (response !== newUser) {
          const error = new Error('서버 응답에 문제가 발생하여 회원가입을 처리할 수 없습니다.')
          const errorObj = { error, errorCode: 500 }
          throw errorObj
        }

        dispatch('alertStore/setAlertInfo', {
          type: 'success',
          message: '회원가입이 정상적으로 완료되었습니다!',
        }, { root: true })

        return response
      } catch (error) {
        dispatch('errorStore/handlePredictableError', error, { root: true })
        return 'failed'
      }
    },
    async checkPassword({ dispatch }, checkData) {
      try {
        const response = await matchPassword(checkData)

        if (response !== checkData.id) {
          const error = new Error('서버 응답에 문제가 발생하여 비밀번호 확인을 처리할 수 없습니다.')
          const errorObj = { error, errorCode: 500 }
          throw errorObj
        }

        return response
      } catch (error) {
        dispatch('errorStore/handlePredictableError', error, { root: true })
        return 'failed'
      }
    },
    async modifyPassword({ dispatch }, modifyData) {
      try {
        const response = await modifyPassword(modifyData)

        if (response !== modifyData.id) {
          const error = new Error('서버 응답에 문제가 발생하여 비밀번호 변경을 처리할 수 없습니다.')
          const errorObj = { error, errorCode: 500 }
          throw errorObj
        }

        dispatch('alertStore/setAlertInfo', {
          type: 'success',
          message: '비밀번호 변경이 정상적으로 완료되었습니다!',
        }, { root: true })

        return response
      } catch (error) {
        dispatch('errorStore/handlePredictableError', error, { root: true })
        return 'failed'
      }
    },
  },
}
