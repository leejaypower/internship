<template>
  <div class="todolist_item">
    <v-checkbox
      :checked="todoListItem.checked"
      :disabled="todoListItem.isEdit"
      @change="$emit('onCheckTodoListItem',todoListItem.id)"
    />
    <v-form
      class="item_form"
      @submit.prevent="$emit('onEditTodoListItem', todoListItem.id,todoItemText)"
    >
      <v-text-field
        v-if="todoListItem.isEdit"
        v-model="todoItemText"
        class="item_text_edit_input"
      />
      <span
        v-else
        :class="
          todoListItem.checked ? `item_text item_text_checked` : `item_text`
        "
      >{{ todoListItem.text }}</span>
      <v-btn
        class="item_button"
        type="submit"
        tile
        color="success"
      >
        <v-icon left>
          mdi-pencil
        </v-icon>
        {{ todoListItem.isEdit ? "완료" : "수정" }}
      </v-btn>
      <v-btn
        class="item_button"
        color="error"
        @click="$emit('onDeleteTodoListItem', todoListItem.id)"
      >
        삭제
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'TodoListItem',
  props: {
    todoListItem: {
      type: Object,
      default: () => ({
        id: 0,
        text: 'error',
        checked: false,
        isEdit: false,
      }),
    },
  },
  data() {
    return { todoItemText: this.todoListItem.text }
  },
}
</script>

<style scoped>
.todolist_item {
  display: flex;
  align-items: center;
  height: 3.5rem;
}
.item_form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  flex: 1;
}
.item_text_edit_input {
  flex: 0.7;
}
.item_text {
  flex: 0.7;
}
.item_text_checked {
  text-decoration-line: line-through;
}
.item_button {
  flex: 0.1;
}
</style>
