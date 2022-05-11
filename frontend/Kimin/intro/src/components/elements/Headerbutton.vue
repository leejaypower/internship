<template>
  <button id="openButton"
    @click="openTodoCard"
  >
    <slot></slot>
  </button>
</template>

<script>

export default {
  name: 'headerButton',
  data() {
    return {
      cardOpen: false,
    }
  },
  methods: {
    openTodoCard() {
      this.$store.dispatch('cardChange', true)
    },
    cardClose() {
      this.$store.cardOpen = false
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
