const snackBarStore = {
  state: {
    snackBarAlarm: {
      alarm: false,
      alarmColor: 'pink',
      text: null,
    },
  },
  mutations: {
    changeAlarmState(state, detail) {
      state.snackBarAlarm = detail
      setTimeout(() => {
        state.snackBarAlarm = null
      }, 2000)
    },
  },
  actions: {
    alertMessage({ commit }, info) {
      const detail = {
        alarm: true,
        alarmColor: info.color,
        text: info.text,
      }
      commit('changeAlarmState', detail)
    },
  },
  getters: {
    getSnackBarInfo(state) {
      return state.snackBarAlarm
    },
  },
}

export default snackBarStore
