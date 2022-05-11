<template>
  <div id="app" @keydown.esc="kimin">
    <app-header></app-header>
    <app-nav></app-nav>
    <router-view></router-view>
    <todo-card
    ></todo-card>
  </div>
</template>

<script>
import Header from './components/layout/AppHeader.vue'
import Nav from './components/layout/AppNav.vue'
import TodoCard from './components/elements/TodoCard.vue'

export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-nav': Nav,
    'todo-card': TodoCard,
  },
  methods: {
    kimin(e) {
      if (e.keyCode) {
        this.$store.dispatch('cardChange', false)
      }
    },
    fetchTodos() {
      const data = JSON.parse(window.localStorage.getItem('todos'))
      if (!data) return
      data.forEach((todo) => {
        this.$store.dispatch('addTodos', todo)
      })
    },
  },
  computed: {
    todos() {
      return this.$store.getters.getTodos
    },
  },
  watch: {
    todos() {
      const todos = JSON.stringify(this.todos)
      window.localStorage.setItem('todos', todos)
    },
  },
  mounted() {
    this.fetchTodos()
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  height: 98vh;
  grid-template-rows: 8% 92%;
  grid-template-columns: 10% 20% 50% 20%;
  grid-template-areas:
  'h h h h'
  'n . m .'
}
</style>
