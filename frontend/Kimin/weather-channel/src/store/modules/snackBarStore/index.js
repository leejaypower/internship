const snackBarStore = {
  namespaced: true,
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
        alarmColor: info.color || 'pink',
        text: info.text || '알 수 없는 에러가 발생하였습니다. 고객센터에 문의바랍니다.',
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
