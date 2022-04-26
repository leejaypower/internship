<template>
  <div class="todoItem" @click="showItem">
    <input type="radio" @click.stop="checkFinish"/>
    <div>
      <slot></slot>
    </div>
    <to-do-card
    :cardData="cardData"
    :cardOpen="cardOpen"
    @closeCard="closeCard"
    ></to-do-card>
  </div>
</template>

<script>
import ToDoCard from './elements/TodoCard.vue'

export default {
  components: {
    ToDoCard,
  },
  props: [ 'cardData' ],
  data() {
    return {
      cardOpen: false,
    }
  },
  methods: {
    checkFinish() {
      this.$store.dispatch('eleminateItem', this.cardData.ID)
    },
    showItem() {
      this.cardOpen = true
    },
    closeCard() {
      this.cardOpen = false
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
