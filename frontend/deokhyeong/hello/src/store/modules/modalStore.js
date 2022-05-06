const modalStore = {
  namespaced: true,
  state: {
    isOpenModal: false,
    alertText: '알 수 없는 오류',
    alertType: 'info',
  },
  getters: {
    isOpenModal: (state) => state.isOpenModal,
    alertText: (state) => state.alertText,
    alertType: (state) => state.alertType,
  },
  mutations: {
    open(state, { alertText = '알 수 없는 오류', alertType = '' }) {
      state.isOpenModal = true
      state.alertText = alertText
      state.alertType = alertType
    },
    init(state) {
      state.isOpenModal = false
      state.alertText = '알 수 없는 오류'
      state.alertType = 'info'
    },
  },
  actions: {
    openModal({ commit }, { alertText, alertType }) {
      commit('open', { alertText, alertType })
    },
    closeModal({ commit }) {
      commit('init')
    },
  },
}

export default modalStore
