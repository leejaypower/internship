<template>
  <div class="todo">
    <span v-if="readOnly">{{ value }}</span>
    <input
      v-else
      class="edit_input"
      :value="value"
      :placeholder="value"
      @keypress.enter="onEdit(id, $event)"
    >
    <div class="buttons">
      <button
        class="edit_button"
        @click="modeToggle"
      >
        <span v-if="readOnly">수정</span>
        <span v-else>닫기</span>
      </button>
      <button
        class="delete_button"
        @click="removeList(id)"
      >
        <span>삭제</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    id: {
      type: Number,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    editList: {
      type: Function,
      required: true,
    },
    removeList: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      mode: 'read',
    }
  },
  computed: {
    readOnly() {
      return this.mode === 'read'
    },
  },
  methods: {
    modeToggle() {
      this.mode = (this.mode === 'edit') ? 'read' : 'edit'
    },
    onEdit(id, event) {
      const { value } = event.target
      if (!value) {
        alert('내용을 입력해 주세요.')
        return
      }
      if (value === this.value) {
        alert('변경된 내용이 없습니다.')
        return
      }
      this.editList(id, value)
      this.modeToggle()
    },
  },
}
</script>

<style scoped>
  .todo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;
  }
  .edit_input {
    width: 50%;
    height: 20px;
    border:0;
    border-bottom: 1px solid black;
    font-size: 16px;
  }
  .buttons {
    display: flex;
    align-items: center;
  }
  .edit_button {
    border: 1px solid black;
    background-color: green;
    color:white;
  }
  .delete_button {
    border: 1px solid black;
    background-color: red;
    color:white;
  }
</style>
