export default {
  namespaced: true,
  state: {
    user: {
      id: '',
      name: '',
      pw: '',
    },
  },
  getters: {
    getUserInfo(state) {
      return state.user
    },
    isLogin(state) {
      return state.user.id !== ''
    },
    isRegister(state) {
      return state.register !== ''
    },
  },
  mutations: {
    SET_ID(state, userid) {
      state.user.id = userid
    },
    SET_USER(state, userInfo) {
      state.user.name = userInfo.name
      state.user.id = userInfo.id
      state.user.pw = userInfo.password
      state.user.email = userInfo.email
    },
    CLEAR_USER(state) {
      state.user.id = ''
      state.user.name = ''
      state.user.pw = ''
      state.user.email = ''
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
  },
}
