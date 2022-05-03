<template>
  <div class="notfound-container">
    <span class="notfound-title">404</span>
    <button
      class="notfound-goback-button"
      @click="goBack"
    >
      이전으로
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back()
    },
  },
}
</script>

<style scoped>
  .notfound-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .notfound-title {
    font-size: 70px;
  }
  .notfound-goback-button {
    border: 2px solid;
    border-radius: 10px;
    padding: 10px;
    font-size: 30px;
    font-weight: bold;
    background-color: #42b983;
    color:#fff;
    cursor: pointer;
  }
  @media screen and (max-width: 400px){
    .notfound-title {
      font-size: 50px;
    }
    .notfound-goback-button {
      font-size: 20px;
    }
  }
</style>
