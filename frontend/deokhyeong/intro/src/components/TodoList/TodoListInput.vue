<template>
  <v-form
    class="todolist_input_form"
    @submit.prevent="$emit('onAddTodoListItem', $event)"
  >
    <v-text-field
      class="todolist_input_field"
      placeholder="할 일을 입력해주세요"
      :value="newTodoItem"
      @input="$emit('onChangeInput', $event)"
    />
    <v-btn
      class="todolist_add_button"
      type="submit"
      depressed
      color="primary"
    >
      추가하기
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'TodoListInput',
  props: {
    newTodoItem: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.todolist_input_form {
  display: flex;
  align-items: center;
}
.todolist_input_field {
  padding-right: 1.6rem;
}
.todolist_add_button {
  flex: 0.3;
}
</style>
