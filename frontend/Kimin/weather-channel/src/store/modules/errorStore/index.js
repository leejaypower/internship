const errorStore = {
  namespaced: true,
  state: {
    savedlogs: [],
  },
  mutations: {
    saveLog(state, log) {
      state.savedlogs.push(log)
    },
    emptySavedLog(state) {
      state.savedlogs = []
    },
  },
  actions: {
    recordLog({ commit }, log) {
      commit('saveLog', log)
    },
    initializeSavedLog({ commit }) {
      commit('emptySavedLog')
    },
  },
  getters: {
    getsavedLogs(state) {
      return state.savedlogs
    },
  },
}

export default errorStore
