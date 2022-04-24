<template>
  <v-app>
    <section id="todolist_wrapper">
      <TitleHeader title="TodoList" />
      <main id="todolist_contents">
        <TodoListInput
          :new-todo-item="newTodoItem"
          @onChangeInput="onChangeInput"
          @onAddTodoListItem="onAddTodoListItem"
        />
        <TodoListItems
          :on-delete-todo-list-item="onDeleteTodoListItem"
          :on-check-todo-list-item="onCheckTodoListItem"
          :on-edit-todo-list-item="onEditTodoListItem"
          :todo-list-items="todoListItems"
        />
      </main>
    </section>
  </v-app>
</template>

<script>
import TitleHeader from './components/TitleHeader.vue'
import TodoListInput from './components/TodoList/TodoListInput.vue'
import TodoListItems from './components/TodoList/TodoListItems.vue'

export default {
  name: 'App',
  components: {
    TitleHeader,
    TodoListInput,
    TodoListItems,
  },
  data() {
    return {
      newTodoItem: '',
      todoListItems: [],
    }
  },
  methods: {
    onChangeInput(value) {
      this.newTodoItem = value
    },
    onAddTodoListItem() {
      if (!this.newTodoItem) return
      const todoLength = Number(this.todoListItems?.length)

      const todoItem = {
        id: todoLength ? this.todoListItems[todoLength - 1].id + 1 : 1,
        text: this.newTodoItem,
        checked: false,
        isEdit: false,
      }

      this.todoListItems.push(todoItem)
      this.clearNewTodoItem()
    },
    onDeleteTodoListItem(itemId) {
      this.catchError(() => this.checkItemId(itemId))

      const targetIndex = this.todoListItems.findIndex(
        (todoItem) => todoItem.id === itemId,
      )

      if (targetIndex !== -1) {
        this.todoListItems.splice(targetIndex, 1)
      }
    },
    onCheckTodoListItem(itemId) {
      this.catchError(() => this.checkItemId(itemId))

      const targetIndex = this.todoListItems.findIndex(
        (todoItem) => todoItem.id === itemId,
      )

      const targetItem = this.todoListItems[targetIndex]
      if (targetIndex !== -1) {
        targetItem.checked = !targetItem.checked
      }
    },
    onEditTodoListItem(itemId, itemText) {
      this.catchError(() => this.checkItemId(itemId))

      const targetIndex = this.todoListItems.findIndex(
        (todoItem) => todoItem.id === itemId,
      )

      const targetItem = this.todoListItems[targetIndex]
      if (targetIndex !== -1) {
        targetItem.isEdit = !targetItem.isEdit
        targetItem.text = itemText
      }
    },
    clearNewTodoItem() {
      this.newTodoItem = ''
    },
    checkItemId(itemId) {
      if (typeof itemId !== 'number' || !itemId) {
        throw new Error(
          `해당 아이템의 정보를 얻을 수 없습니다. itemId : ${itemId} `,
        )
      }
    },
    catchError(...callbacks) {
      try {
        callbacks.forEach((callback) => callback())
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style>
#app {
  background: gray;
}
#todolist_wrapper {
  width: 50%;
  height: 100vh;
  background: white;
  margin: 0 auto;
}
#todolist_contents {
  height: 100%;
  padding: 1.2rem 6rem 0 6rem;
}
</style>
