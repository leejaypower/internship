const alertOpen = async ({ commit }, { status, message, timeout = 4000 }) => {
  commit('setAlertData', { status, message, timeout })
}

export default {
  alertOpen,
}
