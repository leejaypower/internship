<template>
  <div>
    <ul>
      <li
        v-for="(todoItem, index) in todoItems"
        :key="todoItem.item"
        class="shadow"
      >
        <i
          class="checkBtn fas fa-check"
          :class="{checkBtnCompleted: todoItem.isComplete}"
          @click="toggleComplete(index)"
        />
        <span :class="{textCompleted: todoItem.isComplete}">{{ todoItem.item }}</span>
        <span
          class="removeBtn"
          @click="removeTodo(todoItem, index)"
        >
          <i class="fas fa-trash-alt" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [ 'todoItems' ],
  methods: {
    removeTodo(todoItem, index) {
      this.$emit('removeItem', todoItem, index)
    },
    toggleComplete(index) {
      this.$emit('toggleTodo', index)
    },
  },
}
</script>

<style scoped>
ul{
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  width: 35%;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.removeBtn{
  margin-left: 20px;
  color: tomato;
}
.checkBtn{
  line-height: 45px;
  color: #ededed;
  margin-right: 5px;
}

.checkBtnCompleted {
  text-decoration: line-through;
  color: #b3adad;
}

.textCompleted{
  text-decoration: line-through;
  color:#b3adad;
}

</style>
