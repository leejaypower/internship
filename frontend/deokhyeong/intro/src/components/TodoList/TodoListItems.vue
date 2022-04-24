<template>
  <ul
    v-show="todoListItems.length !== 0"
    class="todolist_items_wrapper"
  >
    <TodoListItem
      v-for="todoListItem in todoListItems"
      :key="todoListItem.id"
      :todo-list-item="todoListItem"
      @onDeleteTodoListItem="onDeleteTodoListItem"
      @onCheckTodoListItem="onCheckTodoListItem"
      @onEditTodoListItem="onEditTodoListItem"
    />
  </ul>
</template>

<script>
import TodoListItem from './TodoListItem.vue'

export default {
  name: 'TodoListItems',
  components: { TodoListItem },
  props: {
    todoListItems: {
      type: Array,
      default: () => [],
    },
    onDeleteTodoListItem: {
      type: Function,
      default: () => () => {},
    },
    onCheckTodoListItem: {
      type: Function,
      default: () => () => {},
    },
    onEditTodoListItem: {
      type: Function,
      default: () => () => {},
    },
  },
}
</script>

<style scoped>
.todolist_items_wrapper {
  padding-top: 2rem;
  padding-left: 0;
}
</style>
