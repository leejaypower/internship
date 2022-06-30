const getters = {
  isLoginFormModalVisible(state) {
    return state.isLoginFormModalVisible
  },
  myInfo(state) {
    return state.myInfo
  },
  nickname(state) {
    return state.myInfo?.nickname
  },
  accessToken(state) {
    return state.myInfo?.accessToken
  },
}

export default getters
