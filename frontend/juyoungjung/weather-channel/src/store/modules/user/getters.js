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
  responseInfo(state) {
    return state.responseInfo
  },
  responseInfoType(state) {
    return state.responseInfo.type
  },
  responseInfoMessage(state) {
    return state.responseInfo.message
  },
}

export default getters
