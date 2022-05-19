export default {
  login(state, payload) {
    state.userInfo.id = payload.id
    state.userInfo.name = payload.name
    state.loginResult.isSuccess = true
    state.loginResult.failMessage = ''
  },
  loginFail(state, payload) {
    state.loginResult.isSuccess = false
    state.loginResult.failMessage = payload
  },
  logout(state) {
    state.userInfo.id = ''
    state.userInfo.name = ''
    state.loginResult.isSuccess = false
    state.loginResult.failMessage = ''
  },
}
