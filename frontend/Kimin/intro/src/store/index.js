import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    categories: [ '가정', '바로고', '기타' ],
    cardDetail: { category: '카테고리' },
  },
  mutations: {
    addTodos(state, item) {
      state.todos.push(item)
    },
    eleminateItem(state, ID) {
      for (let i = 0; i < state.todos.length; i += 1) {
        if (state.todos[i].ID === ID) {
          state.todos.splice(i, 1)
        }
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
    eleminateItem({ commit }, ID) {
      commit('eleminateItem', ID)
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
  },
})
