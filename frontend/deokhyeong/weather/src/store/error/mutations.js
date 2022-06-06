const setErrorData = (state, error) => {
  state.status = error.status
  state.message = error.message
  state.createdAt = new Date().getTime()
  state.timeout = error.timeout
}

const setSuccessData = (state, response) => {
  state.status = response.status
  state.message = response.message
  state.createdAt = new Date().getTime()
  state.timeout = response.timeout
}

export default {
  setErrorData,
  setSuccessData,
}
