<template>
  <div
    v-show="isShow"
    class="scroll-to-top-button-container"
  >
    <button
      class="scroll-to-top-button"
      @click="scrollToTop"
    >
      <span class="scroll-to-top-button-text">⬆️</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandler)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    scrollHandler() {
      const { scrollY } = window
      if (scrollY > 100) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style scoped>
  .scroll-to-top-button-container {
    position: fixed;
    right: 10px;
    bottom: 10px;
  }
  .scroll-to-top-button {
    border: 0;
    padding: 5px 10px;
    font-size: 30px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
  }
  @media screen and (max-width: 400px){
    scroll-to-top-button {
      font-size: 20px;
    }
  }
</style>
