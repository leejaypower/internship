<template>
  <button id="openButton"
    @click="openTodoCard"
  >
    <slot></slot>
    <to-do-card
    :cardOpen="cardOpen"
    :cardData="cardData"
    @closeCard="closeCard"
    ></to-do-card>
  </button>
</template>

<script>
import toDoCard from './TodoCard.vue'

export default {
  name: 'headerButton',
  components: {
    toDoCard,
  },
  data() {
    return {
      cardOpen: false,
      cardData: {
        title: null,
        contents: null,
        date: this.defaltDate(),
        category: '카테고리',
      },
    }
  },
  methods: {
    openTodoCard() {
      this.cardOpen = true
    },
    closeCard() {
      this.cardOpen = false
    },
    defaltDate() {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
  },
}
</script>

<style>
  #openButton{
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: transparent;
    border-color: transparent;
  }

  #openButton:hover{
    background-color: rgba(128, 128, 128, 0.356);
  }
</style>
