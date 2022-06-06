const setAlertData = (state, alertData) => {
  state.status = alertData.status
  state.message = alertData.message
  state.createdAt = new Date().getTime()
  state.timeout = alertData.timeout
}

export default {
  setAlertData,
}
