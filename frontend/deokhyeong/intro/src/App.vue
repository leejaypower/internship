<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <TitleHeader title='Vue 프로젝트 세팅 - 허덕형'/>
  </div>
</template>

<script>
import TitleHeader from './components/TitleHeader.vue'

export default {
  name: 'App',
  components: { TitleHeader },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
