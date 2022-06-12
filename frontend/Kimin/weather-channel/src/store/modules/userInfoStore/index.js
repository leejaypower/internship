import fakeAxios from '@/services/fakeAxios'
/* eslint-disable */

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
    async editUserInfo({ commit }, editedMyInfo) {
      console.log('액션, 고치기시작')
      try {
        await fakeAxios.post('editUserInfo',editedMyInfo)
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },
  getters: {
    getMyInfo(state) {
      return state.myInfo
    },
  },
}

export default userInfoStore
