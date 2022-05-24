/* eslint-disable no-shadow */
import {
  SET_MY_INFO, REMOVE_MY_INFO, SET_LOGIN_FORM_MODAL_VISIBLE, SET_RESPONSE_INFO, RESET_RESPONSE_INFO,
} from '@/constants/mutation-types'

const state = () => ({
  myInfo: null,
  isLoginFormModalVisible: false,
  responseInfo: {
    type: 'info',
    message: '',
  },
})

const getters = {
  isLoginFormModalVisible(state) {
    return state.isLoginFormModalVisible
  },
  nickname(state) {
    return state.myInfo?.nickname
  },
  email(state) {
    return state.myInfo?.email
  },
  password(state) {
    return state.myInfo?.password
  },
  responseInfoType(state) {
    return state.responseInfo.type
  },
  responseInfoMessage(state) {
    return state.responseInfo.message
  },
}

const actions = {
  setLoginFormModalVisible({ commit }, payload) {
    commit('SET_LOGIN_FORM_MODAL_VISIBLE', payload)
  },
  login({ commit }, payload) {
    if (payload.status === 200) {
      commit('SET_MY_INFO', payload)
      commit('SET_RESPONSE_INFO', payload)
    } else {
      commit('SET_RESPONSE_INFO', payload)
    }
  },
  logout({ commit }) {
    commit('REMOVE_MY_INFO')
    commit('RESET_RESPONSE_INFO')
  },
}

const mutations = {
  [SET_MY_INFO](state, payload) {
    state.myInfo = payload.data
  },
  [SET_RESPONSE_INFO](state, payload) {
    state.responseInfo.type = payload.status === 200 ? 'success' : 'error'
    state.responseInfo.message = '로그인에 성공하였습니다.'
  },
  [REMOVE_MY_INFO](state) {
    state.myInfo = null
    localStorage.removeItem('email')
    localStorage.removeItem('nickname')
    localStorage.removeItem('password')
  },
  [SET_LOGIN_FORM_MODAL_VISIBLE](state, payload) {
    state.isLoginFormModalVisible = payload.visible
  },
  [RESET_RESPONSE_INFO](state) {
    state.responseInfo.message = ''
    state.responseInfo.type = 'info'
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
