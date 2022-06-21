<template>
  <v-app class="app">
    <router-view />
    <snack-bar />
  </v-app>
</template>

<script>
import SnackBar from '@/components/SnackBar.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    SnackBar,
  },
  created() {
    this.getCoordinate()
  },
  methods: {
    ...mapActions([
      'getCoordinate',
    ]),
  },
}

</script>

<style scoped>
  #app{
    background-color: rgb(214, 222, 221);
  }
</style>
