export default {
  login(state, payload) {
    state.userInfo.idx = payload.idx
    state.userInfo.id = payload.id
    state.userInfo.name = payload.name
    state.loginResult.isSuccess = true
    state.loginResult.failMessage = ''
  },
  loginFail(state, payload) {
    state.loginResult.isSuccess = false
    state.loginResult.failMessage = payload
  },
  changeUserNameSuccess(state, payload) {
    state.userInfo.name = payload
    state.changeNameResult.isSuccess = true
    state.changeNameResult.failMessage = ''
  },
  changeUserNameFail(state, payload) {
    state.changeNameResult.isSuccess = false
    state.changeNameResult.failMessage = payload
  },
  logout(state) {
    state.userInfo.id = ''
    state.userInfo.name = ''
    state.userInfo.idx = ''
    state.loginResult.isSuccess = false
    state.loginResult.failMessage = ''
  },
}
