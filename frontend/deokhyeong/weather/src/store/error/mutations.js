const setErrorData = (state, error) => {
  state.status = error.status
  state.message = error.message
  state.createdAt = new Date().getTime()
  state.timeout = error.timeout
}

export default {
  setErrorData,
}
