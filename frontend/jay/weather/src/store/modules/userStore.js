import {
  checkUserId, tryRegister, matchPassword, modifyPassword,
} from '@/sevices/user/index'

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
        dispatch('alertStore/setAlertInfo', {
          type: 'success',
          message: '사용 가능한 아이디입니다.',
        }, { root: true })
        return response
      } catch (error) {
        if (error.message === 'duplicated') {
          dispatch('alertStore/setAlertInfo', {
            type: 'error',
            message: '이미 사용되는 아이디입니다.',
          }, { root: true })
        }
        return 'failed'
      }
    },
    async registerUser({ dispatch }, newUser) {
      try {
        const response = await tryRegister(newUser)
        dispatch('alertStore/setAlertInfo', {
          type: 'success',
          message: '회원가입이 정상적으로 완료되었습니다!',
        }, { root: true })
        return response
      } catch (error) {
        dispatch('alertStore/setAlertInfo', { type: 'error', message: error.message }, { root: true })
        return 'failed'
      }
    },
    async checkPassword({ dispatch }, checkData) {
      try {
        const response = await matchPassword(checkData)
        return response
      } catch (error) {
        dispatch('alertStore/setAlertInfo', {
          type: 'warning',
          message: '현재 비밀번호가 맞지않습니다. 다시 확인해주세요.',
        }, { root: true })
      }
      return 'failed'
    },
    async modifyPassword({ dispatch }, modifyData) {
      try {
        const response = await modifyPassword(modifyData)
        dispatch('alertStore/setAlertInfo', {
          type: 'success',
          message: '비밀번호 변경이 정상적으로 완료되었습니다!',
        }, { root: true })
        return response
      } catch (error) {
        dispatch('alertStore/setAlertInfo', { type: 'error', message: error.message }, { root: true })
        return 'failed'
      }
    },
  },
}
