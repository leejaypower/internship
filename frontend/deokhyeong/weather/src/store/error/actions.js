const recordError = async ({ commit }, { status, message, timeout = 4000 }) => {
  commit('setErrorData', { status, message, timeout })
}

const recordSuccess = async ({ commit }, { status, message, timeout = 4000 }) => {
  commit('setSuccessData', { status, message, timeout })
}

export default {
  recordError,
  recordSuccess,
}
