<template>
  <div id="main">
    <h1> {{`Kimin's To-Do-List(${this.myName})`}} </h1>
    <to-do-item
    v-for="(item,i) in todos" :key="i"
    @deleteItem="eleminateItem(i)"
    @checkItem="checkItem(item.ID)"
    >
    <h2>{{ item.title }}</h2>
    <div id="detailContainer">
      <h3>{{ `${item.date.substr(5, 2)}/${item.date.substr(8, 2)}` }}</h3>
      <div id="categoryContainer"
      :class=classMatch[item.category]
      >{{ item.category }}</div>
    </div>
    </to-do-item>
  </div>
</template>

<script>
import toDoItem from '../components/TodoItem.vue'

export default {
  name: 'viewTemplate',
  components: {
    'to-do-item': toDoItem,
  },
  data() {
    return {
      classMatch: {
        가정: 'home',
        바로고: 'Barogo',
        기타: 'etc',
      },
      myName: this.$route.name,
    }
  },
  computed: {
    todos() {
      const allTodos = this.$store.getters.getTodos
      if (this.myName === 'All') return allTodos
      if (allTodos[0]) {
        const todos = allTodos.filter((todo) => this.classMatch[todo.category] === this.myName)
        return todos
      }
      return null
    },
  },
  methods: {
    eleminateItem(i) {
      this.$store.dispatch('eleminateItem', i)
    },
    checkItem(ID) {
      this.$store.dispatch('cardChange', true)
      this.$store.dispatch('checkItem', ID)
    },
  },
}

</script>

<style scoped>
#main{
  grid-area: m;
  width: 100%;
}
h1 {
  color: red;
  margin: 20px;
}

#detailContainer{
  width: 200px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

#categoryContainer{
  padding: 1px 8px 1px 8px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  border: 0.5px solid grey;
  border-radius: 5px;
}

.home {
  background-color: rgba(224, 224, 87);
}

.barogo {
  background-color: #2962ff;
  color: white;
}

.etc {
  background-color: green;
  color: white;
}

</style>
