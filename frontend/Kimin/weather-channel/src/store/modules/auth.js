import logInAxios from '@/services/fakeAxios'

const auth = {
  state: {
  },
  mutations: {
    saveMyInfo(state, myInfo) {
      state.myInfo = myInfo
    },
  },
  actions: {
    requestVerifyingToken() {
      const myAccessToken = localStorage.getItem('accessToken')
      logInAxios.get.verifyToken(myAccessToken)
    },
    async getMyInfo() {
      const { ID } = JSON.parse(localStorage.getItem('myInfo'))
      const myInfo = await logInAxios.get.getMyInfo(ID)
      return myInfo
    },
    async getTokens(ID, password) {
      logInAxios.get.getTokens({ ID, password })
    },
  },
  getters: {

  },
}

export default auth
