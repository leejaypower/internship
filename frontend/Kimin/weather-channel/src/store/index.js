import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userAccount: null,
  },
  mutations: {
    saveFetchedUserAccount(state, userAccount) {
      state.userAccount = (userAccount)
    },
    saveSignedUpData(state, signUpData) {
      state.userAccount = { ...state.userAccount, ...signUpData }
    },
  },
  actions: {
    forwardingFetchedUserAccount({ commit }, userAccount) {
      commit('saveFetchedUserAccount', userAccount)
    },
    forwardingSignedUpData({ commit }, signUpData) {
      commit('saveSignedUpData', signUpData)
    },
  },
  getters: {
    getUserAccount(state) {
      return state.userAccount
    },
  },
})
