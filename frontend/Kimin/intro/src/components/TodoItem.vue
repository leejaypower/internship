<template>
  <div class="todoItem" @click="checkItem">
    <input type="radio" @click.stop="checkFinish"/>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'toDoItem' ],
  methods: {
    checkFinish() {
      this.$emit('deleteItem')
    },
    checkItem() {
      this.$emit('checkItem')
    },
  },
}
</script>

<style>
.todoItem {
  display: flex;
  background-color: #f5deb3;
  cursor: pointer;
  transition: 0.7s;
  padding: 1%;
  border-radius: 10px;
}

.todoItem h2, h3 {
  margin: 0 0 0 10px;
  text-align: left;
}

.todoItem h2 {
  margin-bottom: 5px;
}

.todoItem input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
