export default {
  userName(state) {
    return state.userInfo.name
  },
  isSuccess(state) {
    return state.loginResult.isSuccess
  },
  failMessage(state) {
    return state.loginResult.failMessage
  },
}
