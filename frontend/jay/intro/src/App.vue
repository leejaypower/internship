<template>
  <div id="app">
    <todo-header />
    <todo-input @addOneTodo="addOneItem" />
    <todo-list
      :todoItems="todoItems"
      @removeItem="removeOneItem"
      @toggleTodo="toggleCheckItem"
    />
    <todo-footer @clearAll="clearAllTodo" />
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  },
  data() {
    return {
      todoItems: [],
    }
  },
  created() {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i += 1) {
        this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
      }
    }
  },
  methods: {
    addOneItem(item) {
      const todoObj = { item, isComplete: false }
      localStorage.setItem(item, JSON.stringify(todoObj))
      this.todoItems.push(todoObj)
    },
    removeOneItem(todoItem, index) {
      if (index >= 0) {
        localStorage.removeItem(todoItem.item)
        this.todoItems.splice(index, 1)
      }
    },
    toggleCheckItem(index) {
      if (this.todoItems[index].isComplete) {
        this.todoItems[index].isComplete = false
      } else {
        this.todoItems[index].isComplete = true
      }
    },
    clearAllTodo() {
      localStorage.clear()
      this.todoItems = []
    },
  },
}
</script>

<style>
body{
  text-align: center;
  background-color: #ededed
}

input{
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}
.shadow{
   box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
}
</style>
