<template>
  <div id="app">
    <router-view />
    <ScrollUp />
  </div>
</template>

<script>
import ScrollUp from './components/ScrollUp.vue'

export default {
  components: {
    ScrollUp,
  },
  created() {
    const { path } = this.$route
    const checkPath = '/intro/me'
    if (path === '/') {
      this.$router.push(checkPath)
    }
  },
}
</script>
