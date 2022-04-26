<template>
  <div id="main">
    <h1> {{`Kimin's To-Do-List(${this.myName})`}} </h1>
    <to-do-item
    v-for="item in todos" :key="item.ID"
    @showItem="showItem(item.ID)"
    :cardData=item
    >
      <h2>{{ item.title }}</h2>
      <div id="detailContainer">
        <h3>{{ `${item.date.substr(5,2)}/${item.date.substr(8,2)}` }}</h3>
        <div id="categoryContainer"
        :class=classMatch[item.category]
        >{{ item.category }}
        </div>
      </div>
    </to-do-item>
  </div>
</template>

<script>
import ToDoItem from '../components/TodoItem.vue'

export default {
  name: 'viewTemplate',
  components: {
    ToDoItem,
  },
  data() {
    return {
      classMatch: {
        가정: 'Home',
        바로고: 'Barogo',
        기타: 'etc',
      },
      myName: this.$route.name,
      cardOpen: false,
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
    showItem(ID) {
      this.$store.dispatch('cardChange', true)
      this.$store.dispatch('checkItem', ID)
      const selectedData = this.todos.filter((item) => item.ID === ID)[0]
      this.cardData = selectedData
    },
    initData() {
      this.cardData = {
        ID: null,
        title: null,
        contents: null,
        date: null,
        category: '카테고리',
      }
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
