const userInfoStore = {
  state: {
    myInfo: {
      ID: null,
      password: null,
      address: null,
      avatarImgSrc: null,
      phoneNumber: null,
    },
  },
  mutations: {
    fetchMyInfo(state, info) {
      state.myInfo = info
    },
  },
  actions: {
    forwardingMyInfo({ commit }, editedInfo) {
      commit('fetchMyInfo', editedInfo)
    },
  },
  getters: {
    getMyInfo(state) {
      return state.myInfo
    },
  },
}

export default userInfoStore
