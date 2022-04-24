<template>
  <div class="container">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <input-component :add-list="addList" />
    <list-component
      :list="list"
      :edit-list="editList"
      :remove-list="removeList"
    >
      <h3
        slot="empty"
        class="empty"
      >
        todo를 입력해 주세요
      </h3>
    </list-component>
  </div>
</template>

<script>
import Input from './components/Input.vue'
import List from './components/List.vue'

export default {
  name: 'App',
  components: {
    'input-component': Input,
    'list-component': List,
  },
  data() {
    return {
      id: 1,
      list: [
        { id: 0, value: 'vue 공부' },
      ],
    }
  },
  methods: {
    addList(value) {
      this.list.push({ id: this.id, value })
      this.id += 1
    },
    editList(id, value) {
      const currentId = this.list.findIndex((todo) => todo.id === id)
      if (currentId === -1) {
        alert('id값을 찾지 못함')
        return
      }
      this.list.splice(currentId, 1, { id, value })
    },
    removeList(id) {
      const newList = this.list.filter((todo) => todo.id !== id)
      this.list = newList
    },
  },
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .empty {
    color: red;
    font-size: 18px;
  }
</style>
