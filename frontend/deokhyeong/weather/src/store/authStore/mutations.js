const setAuthData = (state, { email, password, token }) => {
  state.email = email
  state.password = password
  state.token = token
}

export default {
  setAuthData,
}
