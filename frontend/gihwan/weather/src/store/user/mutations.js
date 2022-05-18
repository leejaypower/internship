export default {
  login(state, payload) {
    const { id, name } = payload
    const { userInfo, loginResult } = state
    userInfo.id = id
    userInfo.name = name
    loginResult.isSuccess = true
    loginResult.failMessage = ''
  },
  loginFail(state, payload) {
    const { loginResult } = state
    loginResult.isSuccess = false
    loginResult.failMessage = payload
  },
}
