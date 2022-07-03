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
    ...mapActions('weatherStore', ['getCoordinate']),
  },
}

</script>

<style scoped>
  #app{
    background-color: rgb(214, 222, 221);
    min-width: 700px;
    min-height: 500px;
    overflow: scroll;
  }
</style>
