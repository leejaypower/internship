import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    categories: [ 'All', '가정', '바로고', '기타' ],
    cardDetail: { category: '카테고리' },
    cardOpen: false,
  },
  mutations: {
    addTodos(state, item) {
      state.todos.push(item)
    },
    addCategories(state, category) {
      state.todos.push(category)
    },
    eleminateItem(state, order) {
      state.todos.splice(order, 1)
    },
    cardChange(state, order) {
      this.state.cardOpen = order
      if (order) {
        this.state.cardDetail = { category: '카테고리' }
      }
    },
    checkItem(state, ID) {
      for (let i = 0; i < this.state.todos.length; i += 1) {
        if (this.state.todos[i].ID === ID) {
          this.state.cardDetail = this.state.todos[i]
        }
      }
    },
    editItems(state, { item, ID }) {
      for (let i = 0; i < this.state.todos.length; i += 1) {
        if (this.state.todos[i].ID === ID) {
          this.state.todos.splice(i, 1, item)
        }
      }
    },
  },
  actions: {
    addTodos({ commit }, item) {
      commit('addTodos', item)
    },
    addCategories({ commit }, category) {
      commit('addCategories', category)
    },
    eleminateItem({ commit }, ID) {
      commit('eleminateItem', ID)
    },
    cardChange({ commit }, ID) {
      commit('cardChange', ID)
    },
    checkItem({ commit }, ID) {
      commit('checkItem', ID)
    },
    editItems({ commit }, { item, ID }) {
      commit('editItems', { item, ID })
    },
  },
  getters: {
    getTodos(state) {
      return [ ...state.todos ]
    },
    getCategories(state) {
      return [ ...state.categories ]
    },
    getCardStatus(state) {
      return state.cardOpen
    },
    getcardDetail(state) {
      return { ...state.cardDetail }
    },
  },
})
