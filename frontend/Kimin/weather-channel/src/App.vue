<template>
  <v-app class="app">
    <router-view />
    <snack-bar />
  </v-app>
</template>

<script>
import SnackBar from '@/components/SnackBar.vue'

export default {
  name: 'App',
  components: {
    SnackBar,
  },
}
</script>

<style scoped>
  #app{
    background-color: rgb(214, 222, 221);
  }
</style>
