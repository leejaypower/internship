const setAuthData = (state, user) => {
  state.userId = user.userId
  state.email = user.email
  state.password = user.password
  state.expire = user.expire
  state.refreshExpire = user.refreshExpire
  state.level = user.level
}

export default {
  setAuthData,
}
