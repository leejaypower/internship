import fakeAxios from '@/services/fakeAxios'

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
    async editUserInfo(_, editedMyInfo) {
      try {
        await fakeAxios.post('editUserInfo', editedMyInfo)
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },
  getters: {
    getStoredMyInfo(state) {
      return state.myInfo
    },
  },
}

export default userInfoStore
