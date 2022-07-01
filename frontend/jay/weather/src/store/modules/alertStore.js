export default {
  namespaced: true,
  state: {
    alert: {
      add: false,
      info: [],
    },
    sheet: {
      show: false,
      message: '',
      confirm: false,
    },
    isLoading: false,
  },
  getters: {
    alert(state) {
      return state.alert
    },
    sheetInfo(state) {
      return state.sheet
    },
    isLoading(state) {
      return state.isLoading
    },
  },
  mutations: {
    SET_ALERT(state, info) {
      state.alert.add = true
      state.alert.info.push(info)
    },
    REMOVE_ALERT(state) {
      state.alert.add = false
      state.alert.info.splice(0, 1)
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
    SET_IS_LOADING(state) {
      state.isLoading = true
    },
    REMOVE_IS_LOADING(state) {
      state.isLoading = false
    },
  },
  actions: {
    setAlertInfo({ commit }, alertInfo) {
      commit('SET_ALERT', alertInfo)
    },
    removeAlert({ commit }) {
      commit('REMOVE_ALERT')
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
    setIsLoading({ commit }) {
      commit('SET_IS_LOADING')
    },
    removeIsLoading({ commit }) {
      commit('REMOVE_IS_LOADING')
    },
  },
}
