export default {
  namespaced: true,
  state: {
    alert: {
      show: false,
      type: '',
      message: '',
    },
    sheet: {
      show: false,
      message: '',
      confirm: false,
    },
  },
  getters: {
    alertInfo(state) {
      return state.alert
    },
    sheetInfo(state) {
      return state.sheet
    },
  },
  mutations: {
    SET_ALERT(state, info) {
      state.alert.show = true
      state.alert.type = info.type
      state.alert.message = info.message
    },
    REMOVE_ALERT(state) {
      state.alert.show = false
      state.alert.type = ''
      state.alert.message = ''
    },
    SET_SHEET(state, message) {
      state.sheet.show = true
      state.sheet.message = message
    },
    SET_AGREE(state) {
      state.sheet.confirm = true
      state.sheet.show = false
    },
    SET_CANCEL(state) {
      state.sheet.confirm = false
      state.sheet.show = false
    },
  },
  actions: {
    setAlertInfo({ commit }, alertInfo) {
      commit('SET_ALERT', alertInfo)
    },
    removeAlert({ commit }) {
      setTimeout(() => {
        commit('REMOVE_ALERT')
      }, 2000)
    },
    setSheetInfo({ commit }, message) {
      commit('SET_SHEET', message)
    },
    setAgree({ commit }) {
      commit('SET_AGREE')
    },
    setCancel({ commit }) {
      commit('SET_CANCEL')
    },
  },
}
