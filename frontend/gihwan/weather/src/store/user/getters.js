export default {
  userIdx(state) {
    return state.userInfo.idx
  },
  userName(state) {
    return state.userInfo.name
  },
  isLoginSuccess(state) {
    return state.loginResult.isSuccess
  },
  loginFailMessage(state) {
    return state.loginResult.failMessage
  },
  isChangeNameSuccess(state) {
    return state.changeNameResult.isSuccess
  },
  changeNameFailMessage(state) {
    return state.changeNameResult.failMessage
  },
}
