<template>
  <v-app>
    <navigation-bar />
    <v-main>
      <v-container
        class="pl-4"
        fluid
      >
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from './components/layouts/NavigationBar.vue'

export default {
  name: 'App',
  components: { NavigationBar },
  data() {
    return {}
  },
}
</script>
