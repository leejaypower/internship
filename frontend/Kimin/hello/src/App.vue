<template>
  <v-app>
    <app-header />
    <router-view />
  </v-app>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
  },
}
</script>
