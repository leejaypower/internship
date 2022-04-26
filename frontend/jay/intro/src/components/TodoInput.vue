<template>
  <div class="inputBox shadow">
    <input
      v-model="todoItemName"
      type="text"
      @keyup.enter="addTodo"
    >
    <button
      class="addContainer"
      @click="addTodo"
    ><i class="fas fa-plus addBtn" /></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoItemName: '',
    }
  },
  methods: {
    addTodo() {
      if (this.todoItemName) {
        this.$emit('addOneTodo', this.todoItemName)
        this.clearInput()
      }
    },
    clearInput() {
      this.todoItemName = ''
    },
  },
}
</script>

<style scoped>
input{
 width: 90%;
}
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  display: flex;
  width:50%;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  margin: auto;
}

.inputBox input{
  border-style: none;
  font-size: 0.9rem;
}

.addContainer{
  border: none;
  height: 50px;
  bottom: 50px;
  background: linear-gradient(to right, #fcb045, #fd1d1d);
  width: 3rem;
  border-radius: 50px;
}

.addBtn {
  color: white;
  vertical-align: middle;
}
</style>
