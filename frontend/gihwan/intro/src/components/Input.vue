<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input
        v-model="value"
        autofocus
        placeholder="todo"
      >
      <button
        v-if="value"
        type="button"
        @click="clear"
      >
        <span>x</span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    addList: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    onSubmit() {
      if (!this.value) {
        alert('내용을 입력해 주세요.')
        return
      }
      this.addList(this.value)
      this.clear()
    },
    clear() {
      this.value = ''
    },
  },
}
</script>

<style scoped>
  form {
   position: relative;
   margin-bottom: 10px;
  }
  input {
    border: 0;
    border-bottom: 1px solid;
    padding:10px 10px 5px;
    font-size: 20px;
    outline: none
  }
  button {
    position: absolute;
    top: 15px;
    right: 0;
    border:0;
    border-radius: 50%;
    color:white;
    background-color: gray;
  }
</style>>
