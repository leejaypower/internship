<template>
  <div>
    <router-view />
    <TheNav />
  </div>
</template>

<script>
import TheNav from '../components/TheNav.vue'

export default {
  components: {
    TheNav,
  },
}
</script>

<style scoped>

</style>
